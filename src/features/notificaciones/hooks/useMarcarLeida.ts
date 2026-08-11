import { useMutation, useQueryClient } from '@tanstack/react-query'
import { notificacionService } from '../services/notificacionService'

export function useMarcarLeida() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: notificacionService.marcarLeida,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['notificaciones'] })
    },
  })
}
