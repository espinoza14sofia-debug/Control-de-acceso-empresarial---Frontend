import { useMutation, useQueryClient } from '@tanstack/react-query'
import { accesoService } from '../services/accesoService'

export function useRegistrarSalida() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: accesoService.registrarSalida,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['accesos'] })
    },
  })
}
