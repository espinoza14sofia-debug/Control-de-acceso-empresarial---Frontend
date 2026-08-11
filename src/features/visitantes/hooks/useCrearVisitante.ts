import { useMutation, useQueryClient } from '@tanstack/react-query'
import { visitanteService } from '../services/visitanteService'

export function useCrearVisitante() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: visitanteService.crear,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['visitantes'] })
    },
  })
}
