import { useQuery } from '@tanstack/react-query'
import { tableroService } from '../services/tableroService'

export function useIndicadoresDelDia() {
  return useQuery({
    queryKey: ['tablero', 'indicadores'],
    queryFn: tableroService.indicadoresDelDia,
    refetchInterval: 30000,
  })
}
