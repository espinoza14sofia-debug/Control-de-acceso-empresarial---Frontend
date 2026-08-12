import { useQuery } from '@tanstack/react-query'
import { visitanteService } from '../services/visitanteService'

export function useVisitantes() {
  return useQuery({
    queryKey: ['visitantes', 'listar'],
    queryFn: visitanteService.listar,
    staleTime: 30_000,
  })
}
