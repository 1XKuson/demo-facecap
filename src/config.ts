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
    devConfig? : {
        showPerformance?: boolean;
    },
    minFaceAreaRatio: number;
    
}

export const defaultConfig: AppConfig = {
    captureCount: 7,
    stableFramesRequired: 3,
    minConfidence: 0.75,
    maxYawAngle: 20,
    maxPitchAngle: 20,
    maxRollAngle: 20,
    showLandmarks: false,
    showBoundingBox: false,
    showFaceGuide: 'oval',
    devConfig: {
        showPerformance: true,
    },
    minFaceAreaRatio: 0.15
};
