
const PREP_STEPS = [
    { title: 'Remove accessories', desc: 'Take off any masks, sunglasses, or heavy hats.' },
    { title: 'Find good lighting', desc: 'Face a light source. Avoid bright glare from behind.' },
    { title: 'Position your face', desc: 'Look straight ahead and fit your face inside the guide oval.' },
];

export default function GuidePage({ onStart, totalCaptures }: { onStart: () => void; totalCaptures: number }) {
    return (
        <div className="w-full flex flex-col items-center">
            {/* Visualizer Animation */}
            <div className="relative w-32 h-40 mb-8 mt-2">
                <div className="absolute inset-0 border-[3px] border-zinc-200 rounded-3xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
                    {/* Dashed Oval Guide */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[72px] h-[92px] border-2 border-dashed border-zinc-300 rounded-[100px]" />

                    {/* Abstract Face Shape */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-[76px] bg-zinc-100 rounded-[100px] flex flex-col items-center pt-5 gap-3">
                        <div className="flex gap-2.5">
                            <div className="w-2 h-2 rounded-full bg-zinc-200" />
                            <div className="w-2 h-2 rounded-full bg-zinc-200" />
                        </div>
                        <div className="w-4 h-1 rounded-full bg-zinc-200" />
                    </div>

                    {/* Scanning Beam */}
                    <div className="absolute left-0 right-0 top-0 h-10 bg-gradient-to-b from-transparent to-violet-500/20 animate-scan">
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-violet-500 shadow-[0_0_8px_2px_rgba(139,92,246,0.4)]" />
                    </div>
                </div>
            </div>

            <div className="mb-10 text-center w-full">
                <h2 className="text-2xl font-extrabold tracking-tight text-zinc-900 mb-2">Preparation</h2>
                <p className="text-sm text-zinc-500 leading-relaxed max-w-sm mx-auto">
                    We will take {totalCaptures} clear photos to analyze your facial structure. The process is fully automated.
                </p>
            </div>

            <div className="flex flex-col gap-7 mb-10 w-full max-w-sm relative pl-2 sm:pl-4">
                {/* Vertical connecting line */}
                <div className="absolute left-[31px] sm:left-[39px] top-6 bottom-6 w-[2px] bg-zinc-100 z-0" />

                {PREP_STEPS.map((step, i) => (
                    <div key={step.title} className="flex items-start gap-5 relative z-10 bg-white group">
                        <div className="w-11 h-11 rounded-full bg-white border-2 border-zinc-100 flex items-center justify-center shrink-0 text-sm font-extrabold text-zinc-400 shadow-sm transition-colors group-hover:border-violet-200 group-hover:text-violet-600">
                            {i + 1}
                        </div>
                        <div className="flex flex-col justify-center min-h-[44px]">
                            <span className="text-sm font-bold text-zinc-900 tracking-tight">{step.title}</span>
                            <span className="text-xs text-zinc-500 mt-1 leading-relaxed">{step.desc}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="w-full max-w-sm">
                <button
                    className="w-full py-4 rounded-xl bg-violet-600 text-white text-sm font-bold tracking-tight shadow-xl shadow-violet-600/20 hover:bg-violet-700 hover:shadow-violet-600/30 active:scale-[0.98] transition-all"
                    onClick={onStart}
                >
                    I'm Ready →
                </button>
            </div>
        </div>
    );
}
