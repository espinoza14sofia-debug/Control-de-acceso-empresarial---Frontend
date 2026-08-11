import { useMutation } from '@tanstack/react-query'
import { accesoService } from '../services/accesoService'
import { descargarArchivo } from '@/utils/descargarArchivo'

export function useDescargarReportePdf() {
  return useMutation({
    mutationFn: ({ fechaInicio, fechaFin }: { fechaInicio?: string; fechaFin?: string }) =>
      accesoService.descargarReportePdf(fechaInicio, fechaFin),
    onSuccess: (blob) => descargarArchivo(blob, 'reporte-accesos.pdf'),
  })
}
