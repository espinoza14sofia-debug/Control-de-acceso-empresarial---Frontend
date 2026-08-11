import { useMutation, useQueryClient } from '@tanstack/react-query'
import { preregistroService } from '../services/preregistroService'

export function useCrearPreregistro() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: preregistroService.crear,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['preregistros'] })
    },
  })
}
