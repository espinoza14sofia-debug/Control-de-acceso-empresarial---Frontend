import { useQuery } from '@tanstack/react-query'
import { preregistroService } from '../services/preregistroService'

export function useVisitasDeHoy() {
  return useQuery({ queryKey: ['preregistros', 'hoy'], queryFn: preregistroService.listarVisitasDeHoy })
}
