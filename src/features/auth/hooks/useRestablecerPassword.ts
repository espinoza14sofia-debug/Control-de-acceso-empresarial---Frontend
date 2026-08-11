import { useMutation } from '@tanstack/react-query'
import { autenticacionService } from '../services/autenticacionService'

export function useRestablecerPassword() {
  return useMutation({
    mutationFn: autenticacionService.restablecerContrasena,
  })
}
