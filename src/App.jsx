import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full bg-slate-800/80 border border-slate-700/60 rounded-2xl p-8 shadow-2xl backdrop-blur-sm text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-indigo-500/10 text-indigo-400 mb-5 ring-1 ring-indigo-500/20">
          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
          Vyapti POS Checkout
        </h1>
        <p className="text-slate-400 text-sm mb-6">
          Vite + React + Tailwind CSS v4 is configured and ready.
        </p>

        <div className="space-y-4">
          <button
            onClick={() => setCount((c) => c + 1)}
            className="w-full py-3 px-4 rounded-xl font-medium text-white bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-indigo-600/20 cursor-pointer"
          >
            Count is {count}
          </button>

          <p className="text-xs text-slate-500">
            Edit <code className="text-indigo-300 font-mono bg-slate-900/60 px-1.5 py-0.5 rounded">src/App.jsx</code> to build your application
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
