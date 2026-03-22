import type { AppConfig } from "../config";

interface ConfigModalProps {
  isOpen: boolean;
  config: AppConfig;
  onClose: () => void;
  onChange: (config: AppConfig) => void;
}

export default function ConfigModal({
  isOpen,
  config,
  onClose,
  onChange,
}: ConfigModalProps) {
  if (!isOpen) return null;

  const update = (key: keyof AppConfig, value: any) => {
    onChange({ ...config, [key]: value });
  };

  return (
    <div className="animate-in fade-in fixed inset-0 z-[100] flex items-center justify-center bg-zinc-900/40 p-4 backdrop-blur-sm duration-200">
      <div className="flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-zinc-100 p-5">
          <h3 className="text-lg font-bold text-zinc-900">SDK Configuration</h3>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 text-zinc-500 transition-colors hover:bg-zinc-200 hover:text-zinc-900"
          >
            ✕
          </button>
        </div>

        <div className="flex flex-col gap-6 overflow-y-auto p-6">
          {/* Capture Settings */}
          <div className="flex flex-col gap-4">
            <p className="text-xs font-bold uppercase tracking-widest text-violet-600">
              Capture Settings
            </p>
            <div className="grid grid-cols-2 gap-4">
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-zinc-600">
                  Capture Count
                </span>
                <input
                  type="number"
                  min="1"
                  max="10"
                  className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
                  value={config.captureCount}
                  onChange={(e) =>
                    update("captureCount", parseInt(e.target.value) || 1)
                  }
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-zinc-600">
                  Stable Frames Req.
                </span>
                <input
                  type="number"
                  min="1"
                  max="30"
                  className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
                  value={config.stableFramesRequired}
                  onChange={(e) =>
                    update(
                      "stableFramesRequired",
                      parseInt(e.target.value) || 1,
                    )
                  }
                />
              </label>
            </div>
          </div>

          {/* Quality Limits */}
          <div className="flex flex-col gap-4">
            <p className="text-xs font-bold uppercase tracking-widest text-violet-600">
              Quality Metrics
            </p>

            <label className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-zinc-600">
                  Min Confidence
                </span>
                <span className="text-xs font-bold text-violet-600">
                  {config.minConfidence}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                className="w-full accent-violet-600"
                value={config.minConfidence}
                onChange={(e) =>
                  update("minConfidence", parseFloat(e.target.value))
                }
              />
            </label>

            <div className="grid grid-cols-3 gap-4">
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-zinc-600">
                  Max Yaw °
                </span>
                <input
                  type="number"
                  min="1"
                  max="45"
                  className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
                  value={config.maxYawAngle}
                  onChange={(e) =>
                    update("maxYawAngle", parseInt(e.target.value) || 1)
                  }
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-zinc-600">
                  Max Pitch °
                </span>
                <input
                  type="number"
                  min="1"
                  max="45"
                  className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
                  value={config.maxPitchAngle}
                  onChange={(e) =>
                    update("maxPitchAngle", parseInt(e.target.value) || 1)
                  }
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-zinc-600">
                  Max Roll °
                </span>
                <input
                  type="number"
                  min="1"
                  max="45"
                  className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
                  value={config.maxRollAngle}
                  onChange={(e) =>
                    update("maxRollAngle", parseInt(e.target.value) || 1)
                  }
                />
              </label>
            </div>
          </div>

          {/* UI Overlay */}
          <div className="flex flex-col gap-4">
            <p className="text-xs font-bold uppercase tracking-widest text-violet-600">
              UI Overlay
            </p>
            <div className="flex flex-col gap-3">
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded text-violet-600 accent-violet-600 focus:ring-violet-500"
                  checked={config.showLandmarks}
                  onChange={(e) => update("showLandmarks", e.target.checked)}
                />
                <span className="text-sm font-medium text-zinc-700">
                  Show Landmarks
                </span>
              </label>
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded text-violet-600 accent-violet-600 focus:ring-violet-500"
                  checked={config.showBoundingBox}
                  onChange={(e) => update("showBoundingBox", e.target.checked)}
                />
                <span className="text-sm font-medium text-zinc-700">
                  Show Bounding Box
                </span>
              </label>
              <label className="flex cursor-pointer items-center gap-3">
                <span className="text-sm font-medium text-zinc-700">
                  Guide Shape:
                </span>
                <select
                  className="rounded-xl border border-zinc-200 px-3 py-1.5 text-sm focus:border-violet-500 focus:outline-none"
                  value={config.showFaceGuide}
                  onChange={(e) => update("showFaceGuide", e.target.value)}
                >
                  <option value="oval">Oval</option>
                  <option value="face">Face Outline</option>
                </select>
              </label>
            </div>
          </div>
          <label className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-600">
                Min Face Ratio
              </span>
              <span className="text-xs font-bold text-violet-600">
                {config.minFaceAreaRatio}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              className="w-full accent-violet-600"
              value={config.minFaceAreaRatio}
              onChange={(e) =>
                update("minFaceAreaRatio", parseFloat(e.target.value))
              }
            />
          </label>
        </div>
        <div className="flex justify-end border-t border-zinc-100 bg-zinc-50 p-5">
          <button
            onClick={onClose}
            className="rounded-xl bg-violet-600 px-6 py-2.5 text-sm font-bold text-white shadow-md shadow-violet-600/20 transition-all hover:bg-violet-700 hover:shadow-violet-600/30"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
