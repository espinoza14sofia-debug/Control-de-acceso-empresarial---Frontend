import { useMutation } from '@tanstack/react-query'
import { accesoService } from '../services/accesoService'
import { descargarArchivo } from '@/utils/descargarArchivo'

export function useDescargarReporteExcel() {
  return useMutation({
    mutationFn: ({ fechaInicio, fechaFin }: { fechaInicio?: string; fechaFin?: string }) =>
      accesoService.descargarReporteExcel(fechaInicio, fechaFin),
    onSuccess: (blob) => descargarArchivo(blob, 'reporte-accesos.xlsx'),
  })
}
