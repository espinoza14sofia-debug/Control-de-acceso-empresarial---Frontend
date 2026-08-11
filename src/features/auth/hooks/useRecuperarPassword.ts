import { useMutation } from '@tanstack/react-query'
import { autenticacionService } from '../services/autenticacionService'

export function useRecuperarPassword() {
  return useMutation({
    mutationFn: autenticacionService.solicitarRecuperacion,
  })
}
