import type { ScanPhase } from './ScanPage';

export function ScanInfoPanel({ phase, count }: { phase: ScanPhase; count: number }) {
    const steps = [
        { n: 1, label: 'Look straight at the camera', done: count >= 1 },
        { n: 2, label: 'Hold still for a moment', done: count >= 2 },
        { n: 3, label: 'Final capture — almost done', done: count >= 3 },
    ];
    return (
        <div className="flex flex-col gap-4">
            <div className="bg-white border border-zinc-200 rounded-2xl p-5 shadow-sm">
                <p className="text-xs font-bold tracking-widest uppercase text-zinc-400 mb-4">Progress</p>
                <div className="flex flex-col gap-4">
                    {steps.map(s => (
                        <div key={s.n} className="flex items-center gap-4">
                            <div className={`
                                w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-sm font-bold border-2 transition-all duration-300
                                ${s.done ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : phase === 'loading' ? 'bg-zinc-100 text-zinc-400 border-zinc-200' : 'bg-indigo-50 text-violet-600 border-indigo-100'}
                            `}>
                                {s.done ? '✓' : s.n}
                            </div>
                            <span className={`text-sm tracking-tight ${s.done ? 'text-zinc-900 font-bold' : 'text-zinc-500'}`}>
                                {s.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-indigo-50/50 border border-indigo-100 rounded-2xl p-4">
                <p className="text-xs font-bold text-violet-600 mb-1.5 flex items-center gap-1.5">
                    <span className="text-base">💡</span> Tips
                </p>
                <p className="text-xs text-indigo-500/80 leading-relaxed font-medium">
                    Keep your face centered in the oval. The system will automatically capture when your pose is good.
                </p>
            </div>
        </div>
    );
}
