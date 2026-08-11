import { apiClient } from '@/services/apiClient'
import type {
  ActualizarVisitanteRequest,
  CrearVisitanteRequest,
  Visitante,
  VisitaHistorial,
} from '../types/visitante.types'

/** Corresponde 1:1 al modulo `visitantes` del backend (prefijo /visitantes). */
export const visitanteService = {
  listar: async (): Promise<Visitante[]> => {
    const { data } = await apiClient.get<Visitante[]>('/visitantes')
    return data
  },

  obtenerPorId: async (id: string): Promise<Visitante> => {
    const { data } = await apiClient.get<Visitante>(`/visitantes/${id}`)
    return data
  },

  crear: async (datos: CrearVisitanteRequest): Promise<Visitante> => {
    const { data } = await apiClient.post<Visitante>('/visitantes', datos)
    return data
  },

  actualizar: async (id: string, datos: ActualizarVisitanteRequest): Promise<Visitante> => {
    const { data } = await apiClient.patch<Visitante>(`/visitantes/${id}`, datos)
    return data
  },

  desactivar: async (id: string): Promise<Visitante> => {
    const { data } = await apiClient.patch<Visitante>(`/visitantes/${id}/desactivar`)
    return data
  },

  historial: async (id: string): Promise<VisitaHistorial[]> => {
    const { data } = await apiClient.get<VisitaHistorial[]>(`/visitantes/${id}/historial`)
    return data
  },
}
