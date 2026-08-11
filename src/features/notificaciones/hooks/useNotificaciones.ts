import { useQuery } from '@tanstack/react-query'
import { notificacionService } from '../services/notificacionService'

/**
 * El backend no expone push real para notificaciones (solo access_logs
 * tiene Supabase Realtime confirmado). Se usa polling corto como base;
 * ver 05-FLUJO-DATOS-Y-RECOMENDACIONES.md para la justificacion.
 */
export function useNotificaciones() {
  return useQuery({
    queryKey: ['notificaciones'],
    queryFn: notificacionService.listarMias,
    refetchInterval: 20000,
  })
}
