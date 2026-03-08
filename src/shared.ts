import { FaceStatus } from 'facecap';

export type Step = 'guide' | 'scan' | 'results';

export const TOTAL_CAPTURES = 3;

export function pillClass(status: FaceStatus): string {
    const base = "px-4 py-2 rounded-full text-[11px] font-bold tracking-widest uppercase transition-colors duration-300 max-w-[60%] text-center ";
    switch (status) {
        case FaceStatus.READY:
        case FaceStatus.HOLD_STILL:
        case FaceStatus.CAPTURING:
            return base + 'bg-indigo-50 text-violet-600';
        case FaceStatus.COMPLETE:
            return base + 'bg-emerald-50 text-emerald-600';
        case FaceStatus.NO_FACE:
        case FaceStatus.MULTIPLE_FACES:
            return base + 'bg-red-50 text-red-600';
        default:
            return base + 'bg-amber-50 text-amber-600';
    }
}
