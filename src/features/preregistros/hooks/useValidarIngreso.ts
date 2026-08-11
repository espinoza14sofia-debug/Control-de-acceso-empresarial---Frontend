import { useMutation, useQueryClient } from '@tanstack/react-query'
import { preregistroService } from '../services/preregistroService'

export function useValidarIngreso() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: preregistroService.validarIngreso,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['preregistros'] })
      void queryClient.invalidateQueries({ queryKey: ['accesos'] })
    },
  })
}
