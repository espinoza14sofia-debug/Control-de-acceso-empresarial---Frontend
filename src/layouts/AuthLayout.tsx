import { Outlet } from 'react-router-dom'

/** Layout para /login, /recuperar-password, /restablecer-password. */
export function AuthLayout() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface px-4">
      <div className="w-full max-w-sm">
        <h1 className="mb-6 text-center text-xl font-semibold text-ink-900">
          ControlAccesoEmpresarial
        </h1>
        <div className="rounded-lg border border-ink-300/50 bg-white p-6 shadow-sm">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
