import { useQuery } from '@tanstack/react-query'
import { accesoService } from '../services/accesoService'

export function usePermanenciaExcedida() {
  return useQuery({
    queryKey: ['accesos', 'permanencia-excedida'],
    queryFn: accesoService.permanenciaExcedida,
    refetchInterval: 30000,
  })
}
