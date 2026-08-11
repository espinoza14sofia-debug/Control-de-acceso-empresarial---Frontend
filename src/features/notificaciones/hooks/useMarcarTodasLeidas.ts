import { useMutation, useQueryClient } from '@tanstack/react-query'
import { notificacionService } from '../services/notificacionService'

export function useMarcarTodasLeidas() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: notificacionService.marcarTodasLeidas,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['notificaciones'] })
    },
  })
}
