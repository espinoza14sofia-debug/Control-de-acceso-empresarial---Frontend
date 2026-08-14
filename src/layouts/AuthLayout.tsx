import { Outlet } from 'react-router-dom'
import { ShieldCheck } from 'lucide-react'

/** Layout para /login, /recuperar-password, /restablecer-password. */
export function AuthLayout() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-noir-800 px-4">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-500/10 blur-[130px]" />
      </div>

      <div className="relative z-10 w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl border border-taupe-400/30 bg-slate-500/20">
            <ShieldCheck className="h-6 w-6 text-sand-300" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-cream-50">
            ControlAccesoEmpresarial
          </h1>
          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-sand-300/70">
            Acceso administrativo
          </p>
        </div>

        <div className="rounded-2xl border border-taupe-400/20 bg-noir-700/60 p-6 shadow-2xl backdrop-blur-xl">
          <Outlet />
        </div>

        <p className="mt-6 text-center text-xs text-sand-300/40">
          Sistema interno de control de acceso empresarial
        </p>
      </div>
    </div>
  )
}