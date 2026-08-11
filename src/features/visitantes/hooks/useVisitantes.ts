import { useQuery } from '@tanstack/react-query'
import { visitanteService } from '../services/visitanteService'

export function useVisitantes() {
  return useQuery({ queryKey: ['visitantes'], queryFn: visitanteService.listar })
}
