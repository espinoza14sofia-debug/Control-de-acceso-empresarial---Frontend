import { apiClient } from '@/services/apiClient'
import type {
  CrearPreregistroRequest,
  GenerarQrResponse,
  Preregistro,
  ValidarIngresoRequest,
  ValidarIngresoResponse,
} from '../types/preregistro.types'

/** Corresponde 1:1 al modulo `preregistros` del backend (prefijo /preregistros). */
export const preregistroService = {
  listarVisitasDeHoy: async (): Promise<Preregistro[]> => {
    const { data } = await apiClient.get<Preregistro[]>('/preregistros/hoy')
    return data
  },

  obtenerPorId: async (id: string): Promise<Preregistro> => {
    const { data } = await apiClient.get<Preregistro>(`/preregistros/${id}`)
    return data
  },

  generarQr: async (id: string): Promise<GenerarQrResponse> => {
    const { data } = await apiClient.get<GenerarQrResponse>(`/preregistros/${id}/qr`)
    return data
  },

  crear: async (datos: CrearPreregistroRequest): Promise<Preregistro> => {
    const { data } = await apiClient.post<Preregistro>('/preregistros', datos)
    return data
  },

  validarIngreso: async (datos: ValidarIngresoRequest): Promise<ValidarIngresoResponse> => {
    const { data } = await apiClient.post<ValidarIngresoResponse>('/preregistros/validar-ingreso', datos)
    return data
  },

  cancelar: async (id: string): Promise<Preregistro> => {
    const { data } = await apiClient.patch<Preregistro>(`/preregistros/${id}/cancelar`)
    return data
  },
}
