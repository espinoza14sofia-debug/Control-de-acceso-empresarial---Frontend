import { useQuery } from '@tanstack/react-query'
import { accesoService } from '../services/accesoService'

export function useVisitantesFrecuentes(limite = 10) {
  return useQuery({
    queryKey: ['accesos', 'visitantes-frecuentes', limite],
    queryFn: () => accesoService.visitantesFrecuentes(limite),
  })
}
