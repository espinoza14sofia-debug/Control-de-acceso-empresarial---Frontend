import { useQuery } from '@tanstack/react-query'
import { accesoService } from '../services/accesoService'
import type { FiltrosHistorial } from '../types/acceso.types'

export function useHistorialAccesos(filtros: FiltrosHistorial = {}) {
  return useQuery({
    queryKey: ['accesos', 'historial', filtros],
    queryFn: () => accesoService.historial(filtros),
  })
}
