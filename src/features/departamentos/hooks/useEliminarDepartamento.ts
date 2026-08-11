import { useMutation, useQueryClient } from '@tanstack/react-query'
import { departamentoService } from '../services/departamentoService'

export function useEliminarDepartamento() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: departamentoService.eliminar,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['departamentos'] })
    },
  })
}
