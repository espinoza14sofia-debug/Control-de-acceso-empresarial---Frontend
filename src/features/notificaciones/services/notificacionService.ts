import { apiClient } from '@/services/apiClient'
import type { Notificacion } from '../types/notificacion.types'

/** Corresponde 1:1 al modulo `notificaciones` del backend (prefijo /notificaciones). */
export const notificacionService = {
  listarMias: async (): Promise<Notificacion[]> => {
    const { data } = await apiClient.get<Notificacion[]>('/notificaciones')
    return data
  },

  marcarLeida: async (id: string): Promise<Notificacion> => {
    const { data } = await apiClient.patch<Notificacion>(`/notificaciones/${id}/leida`)
    return data
  },

  marcarTodasLeidas: async (): Promise<{ mensaje: string }> => {
    const { data } = await apiClient.patch('/notificaciones/leer-todas')
    return data
  },
}
