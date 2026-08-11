import { useMutation, useQueryClient } from '@tanstack/react-query'
import { usuarioService } from '../services/usuarioService'

export function useSubirFotoUsuario() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, archivo }: { id: string; archivo: File }) => usuarioService.subirFoto(id, archivo),
    onSuccess: (_datos, variables) => {
      void queryClient.invalidateQueries({ queryKey: ['usuarios', variables.id] })
    },
  })
}
