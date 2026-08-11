import { useMutation, useQueryClient } from '@tanstack/react-query'
import { usuarioService } from '../services/usuarioService'
import type { ActualizarUsuarioRequest } from '../types/usuario.types'

export function useActualizarUsuario() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, datos }: { id: string; datos: ActualizarUsuarioRequest }) =>
      usuarioService.actualizar(id, datos),
    onSuccess: (_datos, variables) => {
      void queryClient.invalidateQueries({ queryKey: ['usuarios'] })
      void queryClient.invalidateQueries({ queryKey: ['usuarios', variables.id] })
    },
  })
}
