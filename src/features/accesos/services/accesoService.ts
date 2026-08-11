import { apiClient, descargarBlob } from '@/services/apiClient'
import type {
  AccessLog,
  EntradaManualRequest,
  FiltrosHistorial,
  RegistrarSalidaRequest,
  VisitanteFrecuente,
} from '../types/acceso.types'

/**
 * Corresponde 1:1 al modulo `accesos` del backend (prefijo /accesos).
 * Incluye tanto control fisico de ingreso/salida como los reportes,
 * porque asi esta organizado el AccesosController real.
 */
export const accesoService = {
  presenciaActual: async (): Promise<AccessLog[]> => {
    const { data } = await apiClient.get<AccessLog[]>('/accesos/presencia')
    return data
  },

  permanenciaExcedida: async (): Promise<AccessLog[]> => {
    const { data } = await apiClient.get<AccessLog[]>('/accesos/permanencia-excedida')
    return data
  },

  historial: async (filtros: FiltrosHistorial = {}): Promise<AccessLog[]> => {
    const { data } = await apiClient.get<AccessLog[]>('/accesos/historial', { params: filtros })
    return data
  },

  visitantesFrecuentes: async (limite = 10): Promise<VisitanteFrecuente[]> => {
    const { data } = await apiClient.get<VisitanteFrecuente[]>('/accesos/visitantes-frecuentes', {
      params: { limite: String(limite) },
    })
    return data
  },

  entradaManual: async (datos: EntradaManualRequest): Promise<AccessLog> => {
    const { data } = await apiClient.post<AccessLog>('/accesos/entrada-manual', datos)
    return data
  },

  registrarSalida: async (datos: RegistrarSalidaRequest): Promise<AccessLog> => {
    const { data } = await apiClient.post<AccessLog>('/accesos/salida', datos)
    return data
  },

  descargarReporteExcel: (fechaInicio?: string, fechaFin?: string) =>
    descargarBlob('/accesos/reporte-excel', { fechaInicio, fechaFin }),

  descargarReportePdf: (fechaInicio?: string, fechaFin?: string) =>
    descargarBlob('/accesos/reporte-pdf', { fechaInicio, fechaFin }),
}
