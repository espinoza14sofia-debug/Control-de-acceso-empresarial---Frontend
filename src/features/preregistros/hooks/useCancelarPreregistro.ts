import { useMutation, useQueryClient } from '@tanstack/react-query'
import { preregistroService } from '../services/preregistroService'

export function useCancelarPreregistro() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: preregistroService.cancelar,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['preregistros'] })
    },
  })
}
