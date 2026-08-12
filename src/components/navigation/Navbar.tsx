import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, LogOut, Search, User } from 'lucide-react'

import { useAuth } from '@/hooks/useAuth'
import { useClickOutside } from '@/hooks/useClickOutside'
import { useLogout } from '@/features/auth/hooks/useLogout'
import { NotificacionesDropdown } from '@/features/notificaciones/components/NotificacionesDropdown'
import { RUTAS } from '@/constants/rutas'
import { ETIQUETA_ROL } from '@/constants/roles'

export function Navbar() {
    const { usuario } = useAuth()
    const logout = useLogout()
    const [menuAbierto, setMenuAbierto] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)

    useClickOutside(menuRef, () => setMenuAbierto(false), menuAbierto)

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
                        <div ref={menuRef} className="relative">
                            <button
                                type="button"
                                onClick={() => setMenuAbierto((v) => !v)}
                                aria-haspopup="menu"
                                aria-expanded={menuAbierto}
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
                                    className={`hidden text-ink-400 transition group-hover:text-brand-600 md:block ${menuAbierto ? 'rotate-180' : ''
                                        }`}
                                />
                            </button>

                            {menuAbierto && (
                                <div
                                    role="menu"
                                    className="absolute right-0 z-40 mt-2 w-64 overflow-hidden rounded-xl border border-ink-300/50 bg-white py-2 shadow-lg"
                                >
                                    <div className="flex items-center gap-3 px-4 py-2">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-100 text-xs font-bold text-brand-600">
                                            {iniciales}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-semibold text-ink-900">{usuario.full_name}</p>
                                            <p className="truncate text-xs text-ink-400">{usuario.email}</p>
                                        </div>
                                    </div>

                                    <div className="my-2 border-t border-ink-300/30" />

                                    <Link
                                        to={RUTAS.PERFIL}
                                        role="menuitem"
                                        onClick={() => setMenuAbierto(false)}
                                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-ink-700 transition hover:bg-surface"
                                    >
                                        <User size={16} className="text-ink-400" />
                                        Mi Perfil
                                    </Link>

                                    <div className="my-2 border-t border-ink-300/30" />

                                    <button
                                        type="button"
                                        role="menuitem"
                                        onClick={() => {
                                            setMenuAbierto(false)
                                            logout.mutate()
                                        }}
                                        disabled={logout.isPending}
                                        className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm text-danger-500 transition hover:bg-danger-50 hover:text-danger-700 disabled:opacity-60"
                                    >
                                        <LogOut size={16} />
                                        {logout.isPending ? 'Cerrando sesión...' : 'Cerrar sesión'}
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}