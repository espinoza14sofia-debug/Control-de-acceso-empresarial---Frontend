import { apiClient } from '@/services/apiClient'
import type { ActualizarDepartamentoRequest, CrearDepartamentoRequest, Departamento } from '../types/departamento.types'

/** Corresponde 1:1 al modulo `departamentos` del backend (prefijo /departamentos). */
export const departamentoService = {
  listar: async (): Promise<Departamento[]> => {
    const { data } = await apiClient.get<Departamento[]>('/departamentos')
    return data
  },

  obtenerPorId: async (id: string): Promise<Departamento> => {
    const { data } = await apiClient.get<Departamento>(`/departamentos/${id}`)
    return data
  },

  crear: async (datos: CrearDepartamentoRequest): Promise<Departamento> => {
    const { data } = await apiClient.post<Departamento>('/departamentos', datos)
    return data
  },

  actualizar: async (id: string, datos: ActualizarDepartamentoRequest): Promise<Departamento> => {
    const { data } = await apiClient.patch<Departamento>(`/departamentos/${id}`, datos)
    return data
  },

  eliminar: async (id: string): Promise<{ eliminado: boolean }> => {
    const { data } = await apiClient.delete(`/departamentos/${id}`)
    return data
  },
}
