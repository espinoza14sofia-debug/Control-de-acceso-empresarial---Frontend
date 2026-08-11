import { useQuery } from '@tanstack/react-query'
import { accesoService } from '../services/accesoService'

/**
 * El backend confirma Supabase Realtime habilitado en `access_logs` con
 * RLS por organizacion (ver docs/realtime.md del backend). Como base
 * simple se usa polling; se puede reemplazar por una suscripcion
 * Realtime del lado del cliente sin tocar el resto de la arquitectura.
 */
export function usePresenciaActual() {
  return useQuery({
    queryKey: ['accesos', 'presencia'],
    queryFn: accesoService.presenciaActual,
    refetchInterval: 15000,
  })
}
