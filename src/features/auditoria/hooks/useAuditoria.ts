import { useQuery } from '@tanstack/react-query'
import { auditoriaService } from '../services/auditoriaService'
import type { FiltrosAuditoria } from '../types/auditoria.types'

export function useAuditoria(filtros: FiltrosAuditoria = {}) {
  return useQuery({
    queryKey: ['auditoria', filtros],
    queryFn: () => auditoriaService.listar(filtros),
  })
}
