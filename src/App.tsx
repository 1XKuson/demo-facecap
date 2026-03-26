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
  const [startTime, setStartTime] = useState<number | null>(null)
  const [duration, setDuration] = useState<number>(0)

  const handleComplete = useCallback((r: CaptureResult[]) => {
    if (startTime) {
      setDuration(Date.now() - startTime)
    }
    setCaptures(r)
    setStep('results')
  }, [startTime])

  const handleRetry = useCallback(() => {
    setCaptures([])
    setStep('guide')
    setStartTime(null)
    setDuration(0)
  }, [])

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-hidden bg-gradient-to-b from-white to-zinc-50">

      {/* Ambient gradient lights */}
      <div className="absolute left-[-10%] top-[-10%] h-[40%] w-[40%] rounded-full bg-violet-500/10 blur-[140px]" />
      <div className="absolute bottom-[-10%] right-[-10%] h-[40%] w-[40%] rounded-full bg-sky-500/10 blur-[140px]" />

      {/* Navbar */}
      <header className="sticky top-0 z-20 w-full border-b border-zinc-200/60 bg-white/60 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">

          <div className="flex items-center gap-2 text-lg font-bold tracking-tight">
            <span className="text-zinc-900">
              face<span className="text-violet-600">cap</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-zinc-500">
              AI Face Capture
            </span>

            <button onClick={() => setShowConfig(true)} className="flex cursor-pointer items-center gap-1.5 rounded-full bg-zinc-100 px-3 py-1.5 text-xs font-semibold text-zinc-600 transition-colors hover:bg-zinc-200">
              ⚙️ Config
            </button>

            <div className="flex items-center gap-2 rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700">
              <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-violet-500"></div>
              Demo
            </div>
          </div>

        </div>
      </header>

      {/* Hero section */}
      <section className="relative z-10 mx-auto w-full max-w-2xl px-6 pb-6 pt-8 text-center sm:pt-12">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-zinc-900 sm:text-5xl">
          AI Face Capture <br className="hidden sm:block" />
          <span className="text-violet-600">in your Browser</span>
        </h1>

        <p className="mx-auto mt-4 max-w-xl leading-relaxed text-zinc-500 sm:text-lg">
          Experience real-time face capture powered by Google's BlazeFace TFLite model. Features automatic quality gating, pose estimation, and a guided capture UI.
        </p>

        {/* Feature badges */}
        {step === 'guide' && (
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {['🎯 BlazeFace ML', '📐 Pose Estimation', '✅ Quality Gating', '📸 Auto-Capture'].map(feat => (
              <span key={feat} className="rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-600 shadow-sm">
                {feat}
              </span>
            ))}
          </div>
        )}
      </section>

      {/* Step progress */}
      <div className="relative z-10 mx-auto w-full max-w-xl px-6 pb-8">
        <StepBar current={step} />
      </div>

      {/* Main Content Card */}
      <main className="relative z-10 flex flex-1 items-start justify-center px-6 pb-24">

        <div className="w-full max-w-4xl rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl shadow-zinc-900/5 transition-all sm:p-10">

          {step === 'guide' && (
            <GuidePage onStart={() => {
              setStartTime(Date.now())
              setStep('scan')
            }} totalCaptures={config.captureCount} />
          )}

          {step === 'scan' && (
            <ScanPage onComplete={handleComplete} config={config} startTime={startTime} />
          )}

          {step === 'results' && (
            <ResultsPage
              captures={captures}
              onRetry={handleRetry}
              totalCaptures={config.captureCount}
              duration={duration}
            />
          )}

        </div>

      </main>

      <ConfigModal isOpen={showConfig} config={config} onClose={() => setShowConfig(false)} onChange={setConfig} />

      {/* Footer */}
      <footer className="pb-6 text-center text-xs text-zinc-400">
        Facecap Demo • AI Face Capture SDK
      </footer>

    </div>
  )
}