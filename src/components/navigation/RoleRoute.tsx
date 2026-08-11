import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { RUTAS } from '@/constants/rutas'
import type { Rol } from '@/constants/roles'

/**
 * Replica en UI la misma matriz de @Roles(...) que ya impone el backend
 * en cada controlador. No es la capa de seguridad real -- esa vive en
 * el backend -- solo evita mostrar pantallas que el backend rechazaria.
 */
export function RoleRoute({ rolesPermitidos }: { rolesPermitidos: Rol[] }) {
  const { usuario } = useAuth()

  if (!usuario || !rolesPermitidos.includes(usuario.role)) {
    return <Navigate to={RUTAS.DASHBOARD} replace />
  }

  return <Outlet />
}
