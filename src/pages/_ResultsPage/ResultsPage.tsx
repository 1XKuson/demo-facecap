import { useEffect, useRef, useState } from 'react';
import type { CaptureResult } from 'facecap';
import AngleMeter from '../../components/AngleMeter';
import { formatDuration } from '../../utils/Timer';

export default function ResultsPage({ captures, onRetry, totalCaptures, duration }: { captures: CaptureResult[]; onRetry: () => void; totalCaptures: number; duration?: number }) {
    const [sel, setSel] = useState(0);
    const cur = captures[sel];

    // Stable blob URLs
    const urls = useRef(captures.map(r => URL.createObjectURL(r.blob)));
    useEffect(() => () => urls.current.forEach(u => URL.revokeObjectURL(u)), []);

    return (
        <div className="w-full space-y-6">
            <div className="text-center">
                <h2 className="text-2xl font-extrabold tracking-tight">✅ Scan Complete</h2>
                <p className="text-zinc-500 text-sm mt-1">{captures.length} photos captured successfully</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
                {/* Preview card */}
                <div>
                    <div className="bg-white border border-zinc-200 rounded-3xl overflow-hidden shadow-xl shadow-zinc-200/50">
                        <div className="aspect-[3/4] w-full bg-zinc-100 relative overflow-hidden">
                            {cur && <img src={urls.current[sel]} alt={`Capture ${sel + 1}`} className="w-full h-full object-cover block" />}
                            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md rounded-full px-4 py-1.5 text-xs font-bold text-violet-600">
                                Photo {sel + 1}
                            </div>
                        </div>

                        {cur && (
                            <div className="p-5 sm:p-6 flex flex-col gap-4">
                                <p className="text-xs font-bold tracking-widest uppercase text-zinc-400">Pose Estimation</p>
                                <div className="flex flex-col gap-3">
                                    <AngleMeter label="Yaw (Left/Right)" value={cur.angle.yaw} />
                                    <AngleMeter label="Pitch (Up/Down)" value={cur.angle.pitch} />
                                    <AngleMeter label="Roll (Tilt)" value={cur.angle.roll} />
                                </div>
                                <div className="flex items-center gap-3 pt-3 border-t border-zinc-100">
                                    <span className="text-xs text-zinc-500 shrink-0">Confidence</span>
                                    <div className="flex-1 h-1.5 rounded-full bg-zinc-100 overflow-hidden">
                                        <div className="h-full bg-gradient-to-r from-violet-600 to-violet-500 rounded-full transition-all duration-500" style={{ width: `${cur.detection.score * 100}%` }} />
                                    </div>
                                    <span className="text-xs font-bold text-violet-600 w-11 text-right">
                                        {(cur.detection.score * 100).toFixed(1)}%
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right column */}
                <div className="flex flex-col gap-5">
                    {/* Thumbnail strip */}
                    <div>
                        <p className="text-xs font-bold tracking-widest uppercase text-zinc-400 mb-3">
                            All Photos
                        </p>
                        <div className="flex gap-2.5 overflow-x-auto pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:overflow-visible no-scrollbar">
                            {captures.map((_, i) => (
                                <button
                                    key={i}
                                    className={`shrink-0 w-24 sm:w-[calc(33.333%-7px)] bg-white border-2 rounded-2xl overflow-hidden flex flex-col transition-all cursor-pointer p-0
                                    ${i === sel ? 'border-violet-600 ring-4 ring-violet-600/15' : 'border-zinc-200 active:border-zinc-300'}`}
                                    onClick={() => setSel(i)}
                                >
                                    <div className="aspect-[3/4] w-full bg-zinc-100 overflow-hidden">
                                        <img src={urls.current[i]} alt={`#${i + 1}`} className="w-full h-full object-cover block" />
                                    </div>
                                    <div className={`py-1.5 text-[10px] font-bold text-center w-full transition-colors ${i === sel ? 'bg-violet-50 text-violet-600' : 'text-zinc-400'}`}>
                                        Photo {i + 1}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Summary card */}
                    <div className="bg-white border border-zinc-200 rounded-2xl p-5 shadow-sm">
                        <p className="text-xs font-bold tracking-widest uppercase text-zinc-400 mb-4">
                            Summary
                        </p>
                        <div className="flex flex-col gap-3">
                            {[
                                { label: 'Photos taken', value: `${captures.length} / ${totalCaptures}` },
                                { label: 'Duration', value: duration ? formatDuration(duration) : '-' },
                                { label: 'Avg confidence', value: `${(captures.reduce((s, r) => s + r.detection.score, 0) / (captures.length || 1) * 100).toFixed(1)}%` },
                                { label: 'Status', value: '✅ Passed' },
                            ].map(row => (
                                <div key={row.label} className="flex justify-between items-center">
                                    <span className="text-sm text-zinc-500 font-medium">{row.label}</span>
                                    <span className="text-sm font-bold text-zinc-900 tracking-tight">{row.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 w-full">
                        {cur && (
                            <a
                                href={urls.current[sel]}
                                download={`face-${sel + 1}.jpg`}
                                className="flex-1 py-3.5 rounded-xl border-2 border-violet-600 bg-transparent text-violet-600 text-sm font-bold text-center hover:bg-violet-50 transition-colors"
                            >
                                ⬇ Download
                            </a>
                        )}
                        <button
                            className="flex-1 py-3.5 rounded-xl border-none bg-violet-600 text-white text-sm font-bold cursor-pointer hover:bg-violet-700 transition-colors shadow-lg shadow-violet-600/20 hover:shadow-violet-600/30 active:translate-y-px"
                            onClick={onRetry}
                        >
                            🔄 Scan Again
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

