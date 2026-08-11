import { useMutation, useQueryClient } from '@tanstack/react-query'
import { departamentoService } from '../services/departamentoService'

export function useCrearDepartamento() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: departamentoService.crear,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['departamentos'] })
    },
  })
}
