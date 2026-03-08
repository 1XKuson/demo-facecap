import type { AutocaptureConfig } from 'facecap';

export interface AppConfig extends Partial<AutocaptureConfig> {
    captureCount: number;
    stableFramesRequired: number;
    minConfidence: number;
    maxYawAngle: number;
    maxPitchAngle: number;
    maxRollAngle: number;
    showLandmarks: boolean;
    showBoundingBox: boolean;
    showFaceGuide: 'oval' | 'face';
}

export const defaultConfig: AppConfig = {
    captureCount: 3,
    stableFramesRequired: 5,
    minConfidence: 0.75,
    maxYawAngle: 15,
    maxPitchAngle: 15,
    maxRollAngle: 15,
    showLandmarks: false,
    showBoundingBox: false,
    showFaceGuide: 'oval',
};
