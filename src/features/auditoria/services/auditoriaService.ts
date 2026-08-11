import { apiClient } from '@/services/apiClient'
import type { EventoAuditoria, FiltrosAuditoria } from '../types/auditoria.types'

/** Corresponde 1:1 al modulo `auditoria` del backend (prefijo /auditoria). */
export const auditoriaService = {
  listar: async (filtros: FiltrosAuditoria = {}): Promise<EventoAuditoria[]> => {
    const { data } = await apiClient.get<EventoAuditoria[]>('/auditoria', {
      params: { ...filtros, limite: filtros.limite ? String(filtros.limite) : undefined },
    })
    return data
  },
}
