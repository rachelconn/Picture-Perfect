package com.pictureperfect;

import android.content.Context;
import android.content.res.Configuration;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.ImageFormat;
import android.graphics.Rect;
import android.hardware.camera2.*;
import android.hardware.camera2.params.OutputConfiguration;
import android.hardware.camera2.params.SessionConfiguration;
import android.media.Image;
import android.media.ImageReader;
import android.os.Handler;
import android.os.HandlerThread;
import android.util.Base64;
import android.util.Log;
import android.view.SurfaceHolder;
import android.view.SurfaceView;
import android.view.Surface;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.ByteArrayOutputStream;
import java.lang.StringBuilder;
import java.util.Arrays;
import java.util.Collections;
import java.util.Map;
import java.nio.ByteBuffer;
import com.facebook.react.bridge.Promise;
import com.pictureperfect.HandlerExecutor;
import com.pictureperfect.CameraUtils;

public class CameraView extends SurfaceView implements SurfaceHolder.Callback {

	CameraManager cameraManager;
	CameraDevice cameraDevice;
	HandlerThread cameraThread;
	Handler cameraHandler;
	SurfaceHolder holder;
	CaptureRequest.Builder captureRequestBuilder;
	CameraCaptureSession captureSession;
	CameraCharacteristics characteristics;
	ImageReader imageReader;

	public CameraView(Context context, CameraManager cameraManager) {
		super(context);
		this.cameraManager = cameraManager;
		holder = getHolder();
		holder.addCallback(this);
	}

	// Helper function to initialize the initial capture session callback
	private CameraCaptureSession.StateCallback createCaptureSessionCallback() {
		return new CameraCaptureSession.StateCallback() {
			@Override
			public void onConfigureFailed(CameraCaptureSession session) {}

			@Override
			public void onConfigured(CameraCaptureSession session) {
				captureSession = session;
				try {
					captureSession.setRepeatingRequest(captureRequestBuilder.build(), null, cameraHandler);
				}
				catch (CameraAccessException e) {
					e.printStackTrace();
				}
			}
		};
	}

	// Helper function to create the initial camera state callback with default settings
	private CameraDevice.StateCallback createCameraStateCallback() {
		return new CameraDevice.StateCallback() {
			@Override
			public void onOpened(CameraDevice camera) {
				// Set cameraDevice to camera on open
				cameraDevice = camera;
				try {
					// Create camera capture request
					captureRequestBuilder = camera.createCaptureRequest(CameraDevice.TEMPLATE_STILL_CAPTURE);
					Surface previewSurface = new Surface(getSurfaceControl());
					captureRequestBuilder.addTarget(previewSurface);
					CameraCaptureSession.StateCallback captureSessionCallback = createCaptureSessionCallback();

					characteristics = cameraManager.getCameraCharacteristics(camera.getId());
					Rect sensorSize = characteristics.get(CameraCharacteristics.SENSOR_INFO_ACTIVE_ARRAY_SIZE);
					imageReader = ImageReader.newInstance(sensorSize.width(), sensorSize.height(), ImageFormat.JPEG, 1);

					// Set default exposure/focus values to match redux
					captureRequestBuilder.set(CaptureRequest.SENSOR_SENSITIVITY, 4500);
					captureRequestBuilder.set(CaptureRequest.LENS_FOCUS_DISTANCE, 0.0f);
					captureRequestBuilder.set(CaptureRequest.SENSOR_EXPOSURE_TIME, 100000000L);
					// captureRequestBuilder.set(CaptureRequest.JPEG_ORIENTATION, 90);

					// Create camera session with request
					SessionConfiguration sessionConfig = new SessionConfiguration(
						SessionConfiguration.SESSION_REGULAR,
						Arrays.asList(new OutputConfiguration(previewSurface), new OutputConfiguration(imageReader.getSurface())),
						new HandlerExecutor(cameraHandler),
						captureSessionCallback
					);
					camera.createCaptureSession(sessionConfig);
				}
				catch (CameraAccessException e) {
					e.printStackTrace();
				}
			}

			@Override
			public void onDisconnected(CameraDevice camera) {}

			@Override
			public void onError(CameraDevice camera, int error) {
				Log.e("CameraView", "Error accessing camera: " + error);
			}
		};
	}

	@Override
	public void surfaceCreated(SurfaceHolder holder) {
		// Start background thread to run the camera in, to use as handler when opening camera
		HandlerThread cameraThread = new HandlerThread("CameraThread");
		cameraThread.start();
		cameraHandler = new Handler(cameraThread.getLooper());

		// Create StateCallback to handle camera status updates
		CameraDevice.StateCallback cameraStateCallback = createCameraStateCallback();

		// Open camera
		String cameraId = CameraUtils.getRearCameraId(cameraManager);
		try {
			cameraManager.openCamera(cameraId, cameraStateCallback, cameraHandler);
		}
		catch (CameraAccessException e) {
			e.printStackTrace();
		}
	}

	@Override
	public void surfaceChanged(SurfaceHolder holder, int format, int width, int height) {}

	@Override
	public void surfaceDestroyed(SurfaceHolder holder) {
		imageReader.close();

		// Stop camera thread
		try {
			cameraThread.quitSafely();
			cameraThread.join();
		}
		catch (InterruptedException e) {
			e.printStackTrace();
		}
	}

	public CameraCaptureSession getCaptureSession() {
		return captureSession;
	}

	// TODO: add mutex lock?
	// TODO: add null checks
	// TODO: add better error handling
	public void updateSettings(Map<CaptureRequest.Key, Object> settings) {
		// Update corresponding settings
		for (Map.Entry<CaptureRequest.Key, Object> setting : settings.entrySet()) {
			captureRequestBuilder.set(setting.getKey(), setting.getValue());
		}

		// Rebuild and resend request
		try {
			captureSession.setRepeatingRequest(captureRequestBuilder.build(), null, cameraHandler);
		}
		catch (CameraAccessException e) {
			e.printStackTrace();
		}
	}

	public void captureImage(final Promise promise) {
		// Create and set listener for image available
		ImageReader.OnImageAvailableListener onImageAvailableListener = new ImageReader.OnImageAvailableListener() {
			@Override
			public void onImageAvailable(ImageReader reader) {
				Image image = reader.acquireLatestImage();

				// Convert to base64
				ByteBuffer buffer = image.getPlanes()[0].getBuffer();
				byte[] bytes = new byte[buffer.capacity()];
				buffer.get(bytes);

				promise.resolve(Base64.encodeToString(bytes, Base64.NO_WRAP));

				// Close resources
				captureRequestBuilder.removeTarget(imageReader.getSurface());
				image.close();
			}
		};
		imageReader.setOnImageAvailableListener(onImageAvailableListener, cameraHandler);

		try {
			captureRequestBuilder.addTarget(imageReader.getSurface());

			// TODO: need to set rotation?
			captureSession.capture(captureRequestBuilder.build(), null, cameraHandler);
		}
		catch (CameraAccessException e) {
			e.printStackTrace();
		}
	}
}
