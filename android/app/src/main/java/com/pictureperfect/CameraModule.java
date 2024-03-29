package com.pictureperfect; // replace com.your-app-name with your app’s name

import android.hardware.camera2.*;
import android.util.Log;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableNativeArray;
import java.lang.Math;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.List;
import android.util.Range;
import android.hardware.camera2.CameraCharacteristics.Key;
import com.pictureperfect.CameraUtils;

public class CameraModule extends ReactContextBaseJavaModule {

	private CameraViewManager cameraViewManager;
	private long desiredExposureTime;

	CameraModule(ReactApplicationContext context, CameraViewManager cameraViewManager) {
		super(context);
		// Link this module to the camera view manager so it can be manipulated
		this.cameraViewManager = cameraViewManager;
	}

	@Override
	public String getName() {
		return "CameraModule";
	}

	private CameraCharacteristics getCameraCharacteristics() throws CameraAccessException {
		CameraManager cameraManager = cameraViewManager.getCameraManager();
		return cameraManager.getCameraCharacteristics(CameraUtils.getRearCameraId(cameraManager));
	}

	// (potential) TODO: Could use WritableArrays instead of strings for sending ranges to frontend

	@ReactMethod
	public void getAvailableISOValues(final Promise promise) {
		try {
			Range<Integer> values = getCameraCharacteristics().get(CameraCharacteristics.SENSOR_INFO_SENSITIVITY_RANGE);
			WritableNativeArray ret = new WritableNativeArray();
			ret.pushInt(values.getLower());
			ret.pushInt(values.getUpper());
			promise.resolve(ret);
		}
		catch (CameraAccessException e) {
			promise.reject("Error getting camera characteristics.");
			e.printStackTrace();
		}
	}

	@ReactMethod
	public void getAvailableExposureTimes(final Promise promise) {
		try {
			Range<Long> values = getCameraCharacteristics().get(CameraCharacteristics.SENSOR_INFO_EXPOSURE_TIME_RANGE);
			WritableNativeArray ret = new WritableNativeArray();
			ret.pushInt(values.getLower().intValue());
			// Limit upper bound to 0.25 seconds, as the app doesn't teach long exposure photography
			// and showing the real upper bound makes it difficult to get the correct exposure time
			ret.pushInt((int) Math.min(values.getUpper(), 250000000));
			promise.resolve(ret);
		}
		catch (CameraAccessException e) {
			promise.reject("Error getting camera characteristics.");
			e.printStackTrace();
		}
	}

	@ReactMethod
	public void getAvailableZoomValues(final Promise promise) {
		// if supporting more devices, try adding graceful fallback when CONTROL_ZOOM_RATIO_RANGE not supported
		// Range<Float> values = getCameraCharacteristics().get(CameraCharacteristics.CONTROL_ZOOM_RATIO_RANGE);
		WritableNativeArray ret = new WritableNativeArray();
		ret.pushDouble(0.0);
		ret.pushDouble(1.0);
		promise.resolve(ret);
	}

	// NOTE: The purpose of this function is to expose the range of desired values to React, NOT
	// to determine the actual setting. The actual range is [0, LENS_INFO_MINIMUM_FOCUS_DISTANCE],
	// where 0 is infinity.
	@ReactMethod
	private void getAvailableFocusDistances(final Promise promise) {
		WritableNativeArray ret = new WritableNativeArray();
		ret.pushDouble(0.0);
		ret.pushDouble(1.0);
		promise.resolve(ret);
	}

	// Helper method to update settings
	private void changeCameraSettings(Map<CaptureRequest.Key, Object> settings) {
		CameraView cameraView = cameraViewManager.getCameraViewInstance();
		if (cameraView == null) return;

		cameraView.updateSettings(settings);
	}

	@ReactMethod
	public void setAutoFocus(boolean enabled) {
		Integer CONTROL_AF_MODE = enabled ? CameraMetadata.CONTROL_AF_MODE_CONTINUOUS_PICTURE : CameraMetadata.CONTROL_AF_MODE_OFF;

		changeCameraSettings(Map.of(
			CaptureRequest.CONTROL_AF_MODE, CONTROL_AF_MODE
		));
	}

	@ReactMethod
	public void setAutoExposure(boolean enabled) {
		Integer CONTROL_AE_MODE = enabled ? CameraMetadata.CONTROL_AE_MODE_ON : CameraMetadata.CONTROL_AE_MODE_OFF;

		changeCameraSettings(Map.of(
			CaptureRequest.CONTROL_AE_MODE, CONTROL_AE_MODE
		));
	}

	// Expected input range: [0, 1], where 0 means focus as close as possible and 1 means as far as possible
	// Input must be transformed into the appropriate value based on camera characteristics.
	@ReactMethod
	public void setFocusDistance(Double newValue, final Promise promise) {
		try {
			Float minFocus = getCameraCharacteristics().get(CameraCharacteristics.LENS_INFO_MINIMUM_FOCUS_DISTANCE);
			Float realFocusDistance = minFocus - (newValue.floatValue() * minFocus);
			changeCameraSettings(Map.of(
				CaptureRequest.CONTROL_AF_MODE, CameraMetadata.CONTROL_AF_MODE_OFF,
				CaptureRequest.LENS_FOCUS_DISTANCE, realFocusDistance
			));
		}
		catch (CameraAccessException e) {
			promise.reject("Error getting camera characteristics.");
			e.printStackTrace();
		}
	}

	@ReactMethod
	public void setISO(Double newValue) {
		changeCameraSettings(Map.of(
			CaptureRequest.CONTROL_AE_MODE, CameraMetadata.CONTROL_AE_MODE_OFF,
			CaptureRequest.SENSOR_SENSITIVITY, newValue.intValue()
		));
	}

	@ReactMethod
	public void setExposureTime(Double newValue) {
		// Set the desired exposure time to use when capturing image to the user-specified value
		desiredExposureTime = newValue.longValue();

		changeCameraSettings(Map.of(
			CaptureRequest.CONTROL_AE_MODE, CameraMetadata.CONTROL_AE_MODE_OFF,
			// Limit camera preview exposure time to keep it responsive
			CaptureRequest.SENSOR_EXPOSURE_TIME, Math.min(newValue.longValue(), 100000000)
		));
	}

	@ReactMethod
	public void captureImage(final Promise promise) {
		cameraViewManager.getCameraViewInstance().captureImage(promise);
	}
}
