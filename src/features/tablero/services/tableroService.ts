import { apiClient } from '@/services/apiClient'
import type { IndicadoresDelDia } from '../types/tablero.types'

/** Corresponde 1:1 al modulo `tablero` del backend (GET /tablero/indicadores). */
export const tableroService = {
  indicadoresDelDia: async (): Promise<IndicadoresDelDia> => {
    const { data } = await apiClient.get<IndicadoresDelDia>('/tablero/indicadores')
    return data
  },
}
