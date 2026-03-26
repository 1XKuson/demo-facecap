
const PREP_STEPS = [
    { title: 'Remove accessories', desc: 'Take off any masks, sunglasses, or heavy hats.' },
    { title: 'Find good lighting', desc: 'Face a light source. Avoid bright glare from behind.' },
    { title: 'Position your face', desc: 'Look straight ahead and fit your face inside the guide oval.' },
];

export default function GuidePage({ onStart, totalCaptures }: { onStart: () => void; totalCaptures: number }) {
    return (
        <div className="flex w-full flex-col items-center">
            {/* Visualizer Animation */}
            <div className="relative mb-8 mt-2 h-40 w-32">
                <div className="absolute inset-0 overflow-hidden rounded-3xl border-[3px] border-zinc-200 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                    {/* Dashed Oval Guide */}
                    <div className="absolute left-1/2 top-1/2 h-[92px] w-[72px] -translate-x-1/2 -translate-y-1/2 rounded-[100px] border-2 border-dashed border-zinc-300" />

                    {/* Abstract Face Shape */}
                    <div className="absolute left-1/2 top-1/2 flex h-[76px] w-14 -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-3 rounded-[100px] bg-zinc-100 pt-5">
                        <div className="flex gap-2.5">
                            <div className="h-2 w-2 rounded-full bg-zinc-200" />
                            <div className="h-2 w-2 rounded-full bg-zinc-200" />
                        </div>
                        <div className="h-1 w-4 rounded-full bg-zinc-200" />
                    </div>

                    {/* Scanning Beam */}
                    <div className="absolute left-0 right-0 top-0 h-10 animate-scan bg-gradient-to-b from-transparent to-violet-500/20">
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-violet-500 shadow-[0_0_8px_2px_rgba(139,92,246,0.4)]" />
                    </div>
                </div>
            </div>

            <div className="mb-10 w-full text-center">
                <h2 className="mb-2 text-2xl font-extrabold tracking-tight text-zinc-900">Preparation</h2>
                <p className="mx-auto max-w-sm text-sm leading-relaxed text-zinc-500">
                    We will take {totalCaptures} clear photos to analyze your facial structure. The process is fully automated.
                </p>
            </div>

            <div className="relative mb-10 flex w-full max-w-sm flex-col gap-7 pl-2 sm:pl-4">
                {/* Vertical connecting line */}
                <div className="absolute bottom-6 left-[31px] top-6 z-0 w-[2px] bg-zinc-100 sm:left-[39px]" />

                {PREP_STEPS.map((step, i) => (
                    <div key={step.title} className="group relative z-10 flex items-start gap-5 bg-white">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-zinc-100 bg-white text-sm font-extrabold text-zinc-400 shadow-sm transition-colors group-hover:border-violet-200 group-hover:text-violet-600">
                            {i + 1}
                        </div>
                        <div className="flex min-h-[44px] flex-col justify-center">
                            <span className="text-sm font-bold tracking-tight text-zinc-900">{step.title}</span>
                            <span className="mt-1 text-xs leading-relaxed text-zinc-500">{step.desc}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="w-full max-w-sm">
                <button
                    className="w-full rounded-xl bg-violet-600 py-4 text-sm font-bold tracking-tight text-white shadow-xl shadow-violet-600/20 transition-all hover:bg-violet-700 hover:shadow-violet-600/30 active:scale-[0.98]"
                    onClick={onStart}
                >
                    I'm Ready →
                </button>
            </div>
        </div>
    );
}
