import { Link } from 'react-router-dom'
import { ChevronDown, Search } from 'lucide-react'

import { useAuth } from '@/hooks/useAuth'
import { useLogout } from '@/features/auth/hooks/useLogout'
import { NotificacionesDropdown } from '@/features/notificaciones/components/NotificacionesDropdown'
import { RUTAS } from '@/constants/rutas'
import { ETIQUETA_ROL } from '@/constants/roles'
import { Button } from '@/components/ui/Button'

export function Navbar() {
  const { usuario } = useAuth()
  const logout = useLogout()

  const iniciales =
    usuario?.full_name
      ?.split(' ')
      .map((nombre) => nombre[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() ?? 'US'

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center border-b border-ink-200 bg-white/95 px-4 backdrop-blur sm:px-6 lg:px-8">
      <div className="flex w-full items-center justify-between gap-4">
        {/* Buscador */}
        <div className="hidden min-w-0 flex-1 sm:block">
          <div className="relative max-w-md">
            <Search
              size={17}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400"
            />

            <input
              type="search"
              placeholder="Buscar..."
              className="h-10 w-full rounded-xl border border-transparent bg-surface pl-10 pr-4 text-sm text-ink-900 outline-none transition placeholder:text-ink-400 focus:border-brand-300 focus:bg-white focus:ring-4 focus:ring-brand-50"
            />
          </div>
        </div>

        {/* Derecha */}
        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <NotificacionesDropdown />

          <div className="hidden h-8 w-px bg-ink-200 sm:block" />

          {usuario && (
            <Link
              to={RUTAS.PERFIL}
              className="group flex items-center gap-3 rounded-xl p-1.5 pr-2 transition hover:bg-surface"
            >
              {/* Avatar */}
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-100 text-xs font-bold text-brand-600">
                {iniciales}
              </div>

              {/* Usuario */}
              <div className="hidden min-w-0 text-left md:block">
                <p className="max-w-40 truncate text-sm font-semibold leading-tight text-ink-900">
                  {usuario.full_name}
                </p>

                <p className="mt-0.5 max-w-40 truncate text-xs text-ink-400">
                  {ETIQUETA_ROL[usuario.role]}
                </p>
              </div>

              <ChevronDown
                size={15}
                className="hidden text-ink-400 transition group-hover:text-brand-600 md:block"
              />
            </Link>
          )}

          <Button
            variante="fantasma"
            onClick={() => logout.mutate()}
            cargando={logout.isPending}
          >
            Cerrar sesión
          </Button>
        </div>
      </div>
    </header>
  )
}