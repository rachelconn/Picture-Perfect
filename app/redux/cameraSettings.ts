import { createAction, createReducer } from '@reduxjs/toolkit';
import { NativeModules } from 'react-native';
import { throttle } from '../utils/throttle';

// All interfacing with the camera native module should be done through redux, setters should be encapsulated to this file
const { CameraModule } = NativeModules;

// Export getters so UI components can determine the range of available values
export const getAvailableISOValues: () => Promise<[number, number]> = CameraModule.getAvailableISOValues;
/**
 * Get available exposure times (unit: nanoseconds)
 */
export const getAvailableExposureTimes: () => Promise<[number, number]> = CameraModule.getAvailableExposureTimes;
export const getAvailableFocusDistances: () => Promise<[number, number]> = CameraModule.getAvailableFocusDistances;
export const getAvailableZoomValues: () => Promise<[number, number]> = CameraModule.getAvailableZoomValues;
export const captureImage: () => Promise<string> = CameraModule.captureImage;

export enum CameraSetting {
  AutoFocus = 'autoFocus',
  FocusDistance = 'focusDistance',
  AutoExposure = 'autoExposure',
  ISO = 'ISO',
  ExposureTime = 'exposureTime',
  AutoWhiteBalance = 'autoWhiteBalance',
  WhiteBalance = 'whiteBalance',
  Zoom = 'zoom',
}

interface CameraSettingsState {
  autoFocus: boolean,
  focusDistance: number,
  autoExposure: boolean,
  ISO: number,
  exposureTime: number,
  autoWhiteBalance: boolean,
  whiteBalance: number,
  zoom: number,
}

export const resetAllSettings = createAction('settings/reset');
export const setAutoExposure = createAction<boolean>('settings/autoExposure/set');
export const setAutoFocus = createAction<boolean>('settings/autoFocus/set');
export const setFocusDistance = createAction<number>('settings/focusDistance/set');
export const setISO = createAction<number>('settings/iso/set');
export const setExposureTime = createAction<number>('settings/exposureTime/set');
export const setAutoWhiteBalance = createAction<boolean>('settings/autoWhiteBalance/set');
export const setWhiteBalance = createAction<number>('settings/whiteBalance/set');
export const setZoom = createAction<number>('settings/zoom/set');

function generateInitialState(): CameraSettingsState {
  return {
    autoFocus: true,
    focusDistance: 0,
    autoExposure: true,
    ISO: 4500,
    exposureTime: 10000000,
    autoWhiteBalance: true,
    whiteBalance: 0.5,
    zoom: 0,
  };
}

export const cameraSettingsReducer = createReducer(generateInitialState, (builder) => {
  builder
    .addCase(resetAllSettings, () => generateInitialState())
    .addCase(setAutoFocus, (state, action) => {
      CameraModule.setAutoFocus(action.payload);
      state.autoFocus = action.payload;
    })
    .addCase(setFocusDistance, (state, action) => {
      throttle('setFocus', 100, () => CameraModule.setFocusDistance(action.payload));
      state.focusDistance = action.payload;
      state.autoFocus = false;
    })
    .addCase(setAutoExposure, (state, action) => {
      CameraModule.setAutoExposure(action.payload);
      state.autoExposure = action.payload;
    })
    .addCase(setISO, (state, action) => {
      const valueToUse = Math.round(action.payload);
      throttle('setISO', 100, () => CameraModule.setISO(valueToUse));
      state.ISO = valueToUse;
      state.autoExposure = false;
    })
    .addCase(setExposureTime, (state, action) => {
      const valueToUse = Math.round(action.payload);
      throttle('setExposureTime', 100, () => CameraModule.setExposureTime(valueToUse));
      state.exposureTime = valueToUse;
      state.autoExposure = false;
    })
    .addCase(setAutoWhiteBalance, (state, action) => {
      // (potential) TODO: if adding wb, make this do something (same with setWhiteBalance)
      state.autoWhiteBalance = action.payload;
    })
    .addCase(setWhiteBalance, (state, action) => {
      state.whiteBalance = action.payload;
    })
    .addCase(setZoom, (state, action) => {
      state.zoom = action.payload;
    });
});
