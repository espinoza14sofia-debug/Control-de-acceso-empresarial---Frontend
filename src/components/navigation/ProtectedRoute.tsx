import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { RUTAS } from '@/constants/rutas'
import { LoadingState } from '@/components/feedback/LoadingState'

/** Exige sesion activa. Redirige a /login si no hay usuario. */
export function ProtectedRoute() {
  const { estaAutenticado, cargandoSesion } = useAuth()

  if (cargandoSesion) return <LoadingState mensaje="Verificando sesion…" />
  if (!estaAutenticado) return <Navigate to={RUTAS.LOGIN} replace />

  return <Outlet />
}
