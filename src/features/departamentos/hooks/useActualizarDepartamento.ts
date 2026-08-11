import { useMutation, useQueryClient } from '@tanstack/react-query'
import { departamentoService } from '../services/departamentoService'
import type { ActualizarDepartamentoRequest } from '../types/departamento.types'

export function useActualizarDepartamento() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, datos }: { id: string; datos: ActualizarDepartamentoRequest }) =>
      departamentoService.actualizar(id, datos),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['departamentos'] })
    },
  })
}
