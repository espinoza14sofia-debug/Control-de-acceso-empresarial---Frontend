import { useMutation, useQueryClient } from '@tanstack/react-query'
import { accesoService } from '../services/accesoService'

export function useEntradaManual() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: accesoService.entradaManual,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['accesos'] })
    },
  })
}
