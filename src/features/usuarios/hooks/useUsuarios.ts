import { useQuery } from '@tanstack/react-query'
import { usuarioService } from '../services/usuarioService'
import type { FiltrosUsuarios } from '../types/usuario.types'

export function useUsuarios(filtros: FiltrosUsuarios = {}) {
  return useQuery({
    queryKey: ['usuarios', filtros],
    queryFn: () => usuarioService.listar(filtros),
  })
}
