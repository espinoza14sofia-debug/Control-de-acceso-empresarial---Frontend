import { useQuery } from '@tanstack/react-query'
import { usuarioService } from '../services/usuarioService'

export function useUsuario(id: string | undefined) {
  return useQuery({
    queryKey: ['usuarios', id],
    queryFn: () => usuarioService.obtenerPorId(id!),
    enabled: !!id,
  })
}
