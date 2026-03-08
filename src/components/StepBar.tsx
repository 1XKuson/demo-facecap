import type { Step } from '../shared';

const STEPS: { key: Step; label: string }[] = [
    { key: 'guide', label: 'Guide' },
    { key: 'scan', label: 'Scan' },
    { key: 'results', label: 'Results' },
];

interface StepBarProps {
    current: Step;
}

export default function StepBar({ current }: StepBarProps) {
    const ci = STEPS.findIndex(s => s.key === current);

    return (
        <div className="flex items-center space-w-0">
            {STEPS.map((st, i) => (
                <div
                    key={st.key}
                    className="flex flex-col items-center relative"
                    style={{ flex: i < STEPS.length - 1 ? '1' : 'unset' }}
                >
                    <div className="flex items-center w-full">
                        <div className={`
                            w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-300
                            ${i < ci ? 'bg-violet-600 border-violet-600 text-white' : i === ci ? 'bg-violet-600 border-violet-600 text-white shadow-[0_0_0_4px_rgba(124,58,237,0.15)]' : 'bg-white border-zinc-200 text-zinc-400'}
                        `}>
                            {i < ci ? '✓' : i + 1}
                        </div>
                        {i < STEPS.length - 1 && (
                            <div className={`flex-1 h-0.5 mb-[22px] transition-colors duration-300 ${i < ci ? 'bg-violet-600' : 'bg-zinc-200'}`} />
                        )}
                    </div>
                    <span className={`text-[11px] font-semibold mt-1.5 tracking-wide whitespace-nowrap 
                        ${i < ci ? 'text-zinc-900' : i === ci ? 'text-violet-600' : 'text-zinc-400'}
                    `}>
                        {st.label}
                    </span>
                </div>
            ))}
        </div>
    );
}

