import './App.css'
import { useState, useCallback } from 'react'
import type { CaptureResult } from 'facecap'

import type { Step } from './shared'
import StepBar from './components/StepBar'
import GuidePage from './pages/_GuidePage/GuidePage'
import ScanPage from './pages/_ScanPage/ScanPage'
import ResultsPage from './pages/_ResultsPage/ResultsPage'

import ConfigModal from './components/ConfigModal'
import { defaultConfig, type AppConfig } from './config'

export default function App() {
  const [step, setStep] = useState<Step>('guide')
  const [captures, setCaptures] = useState<CaptureResult[]>([])
  const [showConfig, setShowConfig] = useState(false)
  const [config, setConfig] = useState<AppConfig>(defaultConfig)

  const handleComplete = useCallback((r: CaptureResult[]) => {
    setCaptures(r)
    setStep('results')
  }, [])

  const handleRetry = useCallback(() => {
    setCaptures([])
    setStep('guide')
  }, [])

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-white to-zinc-50 flex flex-col relative overflow-hidden">

      {/* Ambient gradient lights */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-violet-500/10 blur-[140px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-sky-500/10 blur-[140px]" />

      {/* Navbar */}
      <header className="w-full border-b border-zinc-200/60 backdrop-blur-sm bg-white/60 sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

          <div className="flex items-center gap-2 font-bold text-lg tracking-tight">
            <span className="text-zinc-900">
              face<span className="text-violet-600">cap</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-zinc-500">
              AI Face Capture
            </span>

            <button onClick={() => setShowConfig(true)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-600 text-xs font-semibold transition-colors cursor-pointer">
              ⚙️ Config
            </button>

            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 text-violet-700 text-xs font-semibold">
              <div className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse"></div>
              Demo
            </div>
          </div>

        </div>
      </header>

      {/* Hero section */}
      <section className="text-center pt-8 sm:pt-12 pb-6 px-6 relative z-10 w-full max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-zinc-900 tracking-tight leading-tight">
          AI Face Capture <br className="hidden sm:block" />
          <span className="text-violet-600">in your Browser</span>
        </h1>

        <p className="mt-4 text-zinc-500 sm:text-lg leading-relaxed max-w-xl mx-auto">
          Experience real-time face capture powered by Google's BlazeFace TFLite model. Features automatic quality gating, pose estimation, and a guided capture UI.
        </p>

        {/* Feature badges */}
        {step === 'guide' && (
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {['🎯 BlazeFace ML', '📐 Pose Estimation', '✅ Quality Gating', '📸 Auto-Capture'].map(feat => (
              <span key={feat} className="px-3 py-1.5 rounded-full bg-white border border-zinc-200 text-xs font-semibold text-zinc-600 shadow-sm">
                {feat}
              </span>
            ))}
          </div>
        )}
      </section>

      {/* Step progress */}
      <div className="w-full max-w-xl mx-auto px-6 pb-8 relative z-10">
        <StepBar current={step} />
      </div>

      {/* Main Content Card */}
      <main className="flex-1 flex items-start justify-center px-6 pb-24 relative z-10">

        <div className="
          w-full
          max-w-4xl
          bg-white
          border
          border-zinc-200
          rounded-2xl
          shadow-xl
          shadow-zinc-900/5
          p-6
          sm:p-10
          transition-all
        ">

          {step === 'guide' && (
            <GuidePage onStart={() => setStep('scan')} totalCaptures={config.captureCount} />
          )}

          {step === 'scan' && (
            <ScanPage onComplete={handleComplete} config={config} />
          )}

          {step === 'results' && (
            <ResultsPage
              captures={captures}
              onRetry={handleRetry}
              totalCaptures={config.captureCount}
            />
          )}

        </div>

      </main>

      <ConfigModal isOpen={showConfig} config={config} onClose={() => setShowConfig(false)} onChange={setConfig} />

      {/* Footer */}
      <footer className="text-center pb-6 text-xs text-zinc-400">
        Facecap Demo • AI Face Capture SDK
      </footer>

    </div>
  )
}