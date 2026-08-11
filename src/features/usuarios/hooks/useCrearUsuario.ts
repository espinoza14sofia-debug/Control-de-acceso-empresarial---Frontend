import { useMutation, useQueryClient } from '@tanstack/react-query'
import { usuarioService } from '../services/usuarioService'

export function useCrearUsuario() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: usuarioService.crear,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['usuarios'] })
    },
  })
}
