interface AngleMeterProps {
    label: string;
    value: number;
}

export default function AngleMeter({ label, value }: AngleMeterProps) {
    const pct = Math.min(Math.abs(value) / 30, 1); // 30° = full bar
    const ok = Math.abs(value) <= 15;

    return (
        <div className="flex flex-col gap-1">
            <div className="flex justify-between items-baseline">
                <span className="text-xs text-zinc-500">{label}</span>
                <span className={`text-xs font-bold ${ok ? 'text-emerald-600' : 'text-amber-600'}`}>
                    {value.toFixed(1)}°
                </span>
            </div>
            <div className="h-1.5 rounded-full bg-zinc-100 overflow-hidden">
                <div
                    className={`h-full rounded-full transition-all duration-500 ${ok ? 'bg-gradient-to-r from-emerald-500 to-emerald-400' : 'bg-gradient-to-r from-amber-500 to-amber-400'}`}
                    style={{ width: `${pct * 100}%` }}
                />
            </div>
        </div>
    );
}
