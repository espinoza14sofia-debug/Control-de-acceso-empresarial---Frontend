import { useMutation, useQueryClient } from '@tanstack/react-query'
import { visitanteService } from '../services/visitanteService'
import type { ActualizarVisitanteRequest } from '../types/visitante.types'

export function useActualizarVisitante() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, datos }: { id: string; datos: ActualizarVisitanteRequest }) =>
      visitanteService.actualizar(id, datos),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['visitantes'] })
    },
  })
}
