import type { AppConfig } from '../config';

interface ConfigModalProps {
    isOpen: boolean;
    config: AppConfig;
    onClose: () => void;
    onChange: (config: AppConfig) => void;
}

export default function ConfigModal({ isOpen, config, onClose, onChange }: ConfigModalProps) {
    if (!isOpen) return null;

    const update = (key: keyof AppConfig, value: any) => {
        onChange({ ...config, [key]: value });
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                <div className="p-5 border-b border-zinc-100 flex items-center justify-between">
                    <h3 className="font-bold text-lg text-zinc-900">SDK Configuration</h3>
                    <button onClick={onClose} className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-500 hover:bg-zinc-200 hover:text-zinc-900 transition-colors">
                        ✕
                    </button>
                </div>

                <div className="p-6 overflow-y-auto flex flex-col gap-6">
                    {/* Capture Settings */}
                    <div className="flex flex-col gap-4">
                        <p className="text-xs font-bold tracking-widest uppercase text-violet-600">Capture Settings</p>
                        <div className="grid grid-cols-2 gap-4">
                            <label className="flex flex-col gap-1.5">
                                <span className="text-xs font-semibold text-zinc-600">Capture Count</span>
                                <input type="number" min="1" max="10" className="w-full px-3 py-2 rounded-xl border border-zinc-200 text-sm focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500" value={config.captureCount} onChange={e => update('captureCount', parseInt(e.target.value) || 1)} />
                            </label>
                            <label className="flex flex-col gap-1.5">
                                <span className="text-xs font-semibold text-zinc-600">Stable Frames Req.</span>
                                <input type="number" min="1" max="30" className="w-full px-3 py-2 rounded-xl border border-zinc-200 text-sm focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500" value={config.stableFramesRequired} onChange={e => update('stableFramesRequired', parseInt(e.target.value) || 1)} />
                            </label>
                        </div>
                    </div>

                    {/* Quality Limits */}
                    <div className="flex flex-col gap-4">
                        <p className="text-xs font-bold tracking-widest uppercase text-violet-600">Quality Metrics</p>

                        <label className="flex flex-col gap-2">
                            <div className="flex justify-between items-center">
                                <span className="text-xs font-semibold text-zinc-600">Min Confidence</span>
                                <span className="text-xs font-bold text-violet-600">{config.minConfidence}</span>
                            </div>
                            <input type="range" min="0" max="1" step="0.05" className="w-full accent-violet-600" value={config.minConfidence} onChange={e => update('minConfidence', parseFloat(e.target.value))} />
                        </label>

                        <div className="grid grid-cols-3 gap-4">
                            <label className="flex flex-col gap-1.5">
                                <span className="text-xs font-semibold text-zinc-600">Max Yaw °</span>
                                <input type="number" min="1" max="45" className="w-full px-3 py-2 rounded-xl border border-zinc-200 text-sm focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500" value={config.maxYawAngle} onChange={e => update('maxYawAngle', parseInt(e.target.value) || 1)} />
                            </label>
                            <label className="flex flex-col gap-1.5">
                                <span className="text-xs font-semibold text-zinc-600">Max Pitch °</span>
                                <input type="number" min="1" max="45" className="w-full px-3 py-2 rounded-xl border border-zinc-200 text-sm focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500" value={config.maxPitchAngle} onChange={e => update('maxPitchAngle', parseInt(e.target.value) || 1)} />
                            </label>
                            <label className="flex flex-col gap-1.5">
                                <span className="text-xs font-semibold text-zinc-600">Max Roll °</span>
                                <input type="number" min="1" max="45" className="w-full px-3 py-2 rounded-xl border border-zinc-200 text-sm focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500" value={config.maxRollAngle} onChange={e => update('maxRollAngle', parseInt(e.target.value) || 1)} />
                            </label>
                        </div>
                    </div>

                    {/* UI Overlay */}
                    <div className="flex flex-col gap-4">
                        <p className="text-xs font-bold tracking-widest uppercase text-violet-600">UI Overlay</p>
                        <div className="flex flex-col gap-3">
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input type="checkbox" className="w-4 h-4 rounded text-violet-600 focus:ring-violet-500 accent-violet-600" checked={config.showLandmarks} onChange={e => update('showLandmarks', e.target.checked)} />
                                <span className="text-sm font-medium text-zinc-700">Show Landmarks</span>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input type="checkbox" className="w-4 h-4 rounded text-violet-600 focus:ring-violet-500 accent-violet-600" checked={config.showBoundingBox} onChange={e => update('showBoundingBox', e.target.checked)} />
                                <span className="text-sm font-medium text-zinc-700">Show Bounding Box</span>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer">
                                <span className="text-sm font-medium text-zinc-700">Guide Shape:</span>
                                <select className="px-3 py-1.5 rounded-xl border border-zinc-200 text-sm focus:outline-none focus:border-violet-500" value={config.showFaceGuide} onChange={e => update('showFaceGuide', e.target.value)}>
                                    <option value="oval">Oval</option>
                                    <option value="face">Face Outline</option>
                                </select>
                            </label>
                        </div>
                    </div>
                </div>

                <div className="p-5 border-t border-zinc-100 bg-zinc-50 flex justify-end">
                    <button onClick={onClose} className="px-6 py-2.5 rounded-xl bg-violet-600 text-white text-sm font-bold shadow-md shadow-violet-600/20 hover:bg-violet-700 hover:shadow-violet-600/30 transition-all">
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
}
