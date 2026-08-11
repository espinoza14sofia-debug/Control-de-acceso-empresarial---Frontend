import { useMutation, useQueryClient } from '@tanstack/react-query'
import { usuarioService } from '../services/usuarioService'

export function useActivarDesactivarUsuario() {
  const queryClient = useQueryClient()

  const invalidar = () => {
    void queryClient.invalidateQueries({ queryKey: ['usuarios'] })
  }

  const desactivar = useMutation({
    mutationFn: usuarioService.desactivar,
    onSuccess: invalidar,
  })

  const activar = useMutation({
    mutationFn: usuarioService.activar,
    onSuccess: invalidar,
  })

  return { desactivar, activar }
}
