import { useEffect, useRef, useState, useCallback } from 'react';
import { FaceAutocapture, FaceStatus } from 'facecap';
import type { CaptureResult } from 'facecap';
import { pillClass } from '../../shared';
import { ScanInfoPanel } from './ScanInfoPanel';

import type { AppConfig } from '../../config';

export type ScanPhase = 'loading' | 'running' | 'done' | 'error';

export default function ScanPage({ onComplete, config }: { onComplete: (r: CaptureResult[]) => void; config: AppConfig }) {
    const cameraRef = useRef<HTMLDivElement>(null);
    const captureRef = useRef<FaceAutocapture | null>(null);
    const resultsRef = useRef<CaptureResult[]>([]);

    const [phase, setPhase] = useState<ScanPhase>('loading');
    const [statusMsg, setStatusMsg] = useState('Loading model…');
    const [faceStatus, setFaceStatus] = useState(FaceStatus.READY);
    const [count, setCount] = useState(0);
    const [error, setError] = useState<string | null>(null);

    const start = useCallback(async () => {
        if (!cameraRef.current) return;
        setError(null);
        setPhase('loading');
        setStatusMsg('Loading model…');
        resultsRef.current = [];
        setCount(0);

        try {
            captureRef.current?.destroy();

            const inst = new FaceAutocapture({
                container: cameraRef.current,
                captureCount: config.captureCount,
                stableFramesRequired: config.stableFramesRequired,
                minConfidence: config.minConfidence,
                maxYawAngle: config.maxYawAngle,
                maxPitchAngle: config.maxPitchAngle,
                maxRollAngle: config.maxRollAngle,
                showFaceGuide: config.showFaceGuide,
                showLandmarks: config.showLandmarks,
                showBoundingBox: config.showBoundingBox,
            });

            inst.onStatusChange = (fs, msg) => {
                setFaceStatus(fs);
                setStatusMsg(msg);
            };

            inst.onCapture = (r) => {
                resultsRef.current = [...resultsRef.current, r];
                setCount(resultsRef.current.length);
                if (resultsRef.current.length >= config.captureCount) {
                    setPhase('done');
                    setTimeout(() => onComplete(resultsRef.current), 700);
                }
            };

            await inst.init();
            captureRef.current = inst;
            setPhase('running');
            setStatusMsg('Position your face in the oval');
            await inst.start();
        } catch (e: any) {
            setError(e?.message ?? 'Camera error. Please allow camera access.');
            setPhase('error');
        }
    }, [onComplete]);

    useEffect(() => {
        start();
        return () => { captureRef.current?.destroy(); };
    }, [start]);

    return (
        <div className="w-full space-y-6">
            <div className="text-center">
                <h2 className="text-2xl font-extrabold tracking-tight">Scanning</h2>
                <p className="text-zinc-500 text-sm mt-1">{phase === 'loading' ? 'Initialising camera…' : `${count} of ${config.captureCount} photos taken`}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
                <div className="flex flex-col gap-3">
                    <div className="w-full bg-white rounded-3xl border border-zinc-200 overflow-hidden shadow-xl shadow-zinc-200/50 relative">
                        <div className="aspect-[3/4] w-full bg-black relative overflow-hidden">
                            <div ref={cameraRef} className="w-full h-full" />

                            {phase === 'loading' && (
                                <div className="absolute inset-0 bg-white/95 flex flex-col items-center justify-center gap-4 z-20 backdrop-blur-sm">
                                    <div className="w-12 h-12 rounded-full border-4 border-zinc-200 border-t-violet-600 animate-spin" />
                                    <div className="text-center">
                                        <p className="text-base font-bold text-zinc-900">Loading AI model</p>
                                        <p className="text-sm text-zinc-500 mt-1">BlazeFace + opencv.js</p>
                                    </div>
                                </div>
                            )}

                            {phase === 'done' && (
                                <div className="absolute inset-0 bg-white/95 flex flex-col items-center justify-center gap-3 z-20 backdrop-blur-sm">
                                    <span className="text-6xl animate-bounce">✅</span>
                                    <p className="text-lg font-extrabold text-zinc-900">All done!</p>
                                </div>
                            )}
                        </div>

                        <div className="p-4 sm:p-5 border-t border-zinc-100 flex items-center justify-between gap-3">
                            <div className="flex gap-2">
                                {Array.from({ length: config.captureCount }).map((_, i) => (
                                    <div key={i} className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i < count ? 'bg-violet-600 scale-125' : 'bg-zinc-200'}`} />
                                ))}
                            </div>
                            <div className={pillClass(faceStatus)}>
                                {statusMsg}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <ScanInfoPanel phase={phase} count={count} />
                </div>
            </div>

            {error && (
                <div className="w-full bg-red-50 border border-red-200 rounded-2xl p-4 flex items-center justify-between gap-3">
                    <span className="text-red-600 text-sm font-medium">⚠️ {error}</span>
                    <button className="px-4 py-2 rounded-xl border border-red-600 text-red-600 text-sm font-bold active:bg-red-100/50 transition-colors" onClick={start}>Retry</button>
                </div>
            )}
        </div>
    );
}

