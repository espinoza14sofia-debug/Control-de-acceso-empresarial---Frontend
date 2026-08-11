import { useQuery } from '@tanstack/react-query'
import { visitanteService } from '../services/visitanteService'

export function useHistorialVisitante(id: string | undefined) {
  return useQuery({
    queryKey: ['visitantes', id, 'historial'],
    queryFn: () => visitanteService.historial(id!),
    enabled: !!id,
  })
}
