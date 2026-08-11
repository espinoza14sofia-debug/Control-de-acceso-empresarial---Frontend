import { Link } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { useLogout } from '@/features/auth/hooks/useLogout'
import { NotificacionesDropdown } from '@/features/notificaciones/components/NotificacionesDropdown'
import { RUTAS } from '@/constants/rutas'
import { ETIQUETA_ROL } from '@/constants/roles'
import { Button } from '@/components/ui/Button'

export function Navbar() {
  const { usuario } = useAuth()
  const logout = useLogout()

  return (
    <header className="flex h-16 items-center justify-between border-b border-ink-300/50 bg-white px-6">
      <Link to={RUTAS.DASHBOARD} className="font-semibold text-ink-900">
        ControlAccesoEmpresarial
      </Link>

      <div className="flex items-center gap-4">
        <NotificacionesDropdown />

        {usuario && (
          <Link to={RUTAS.PERFIL} className="flex items-center gap-2 text-sm">
            <span className="font-medium text-ink-900">{usuario.full_name}</span>
            <span className="text-ink-500">· {ETIQUETA_ROL[usuario.role]}</span>
          </Link>
        )}

        <Button variante="fantasma" onClick={() => logout.mutate()} cargando={logout.isPending}>
          Cerrar sesion
        </Button>
      </div>
    </header>
  )
}
