import { useState } from 'react'
import {
  CalendarDays,
  FileSpreadsheet,
  FileText,
  RotateCcw,
} from 'lucide-react'

import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

import { useDescargarReporteExcel } from '../hooks/useDescargarReporteExcel'
import { useDescargarReportePdf } from '../hooks/useDescargarReportePdf'

export function DescargarReporteBotones() {
  const [fechaInicio, setFechaInicio] = useState('')
  const [fechaFin, setFechaFin] = useState('')

  const excel = useDescargarReporteExcel()
  const pdf = useDescargarReportePdf()

  const hayFechas =
    fechaInicio.length > 0 ||
    fechaFin.length > 0

  const rangoInvalido =
    Boolean(fechaInicio) &&
    Boolean(fechaFin) &&
    fechaInicio > fechaFin

  function limpiarFechas() {
    setFechaInicio('')
    setFechaFin('')
  }

  return (
    <div className="space-y-5">
      {/* Selector de periodo */}
      <div className="rounded-xl bg-surface p-4">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <CalendarDays
              size={17}
              className="text-brand-600"
            />

            <p className="text-sm font-semibold text-ink-700">
              Periodo del reporte
            </p>
          </div>

          {hayFechas && (
            <button
              type="button"
              onClick={limpiarFechas}
              className="inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium text-ink-500 transition hover:bg-white hover:text-brand-600"
            >
              <RotateCcw size={14} />
              Limpiar
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            etiqueta="Desde"
            type="date"
            value={fechaInicio}
            onChange={(event) =>
              setFechaInicio(event.target.value)
            }
          />

          <Input
            etiqueta="Hasta"
            type="date"
            value={fechaFin}
            onChange={(event) =>
              setFechaFin(event.target.value)
            }
          />
        </div>

        {rangoInvalido && (
          <p className="mt-3 text-xs font-medium text-danger-500">
            La fecha inicial no puede ser posterior a la fecha final.
          </p>
        )}

        {!hayFechas && (
          <p className="mt-3 text-xs text-ink-400">
            Si no seleccionas fechas, el reporte utilizará el rango predeterminado del sistema.
          </p>
        )}
      </div>

      {/* Formatos */}
      <div>
        <p className="mb-3 text-sm font-semibold text-ink-900">
          Formato de descarga
        </p>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {/* Excel */}
          <button
            type="button"
            disabled={
              excel.isPending ||
              pdf.isPending ||
              rangoInvalido
            }
            onClick={() =>
              excel.mutate({
                fechaInicio:
                  fechaInicio || undefined,
                fechaFin:
                  fechaFin || undefined,
              })
            }
            className="group flex items-center gap-4 rounded-xl border border-ink-200 bg-white p-4 text-left transition hover:border-brand-300 hover:bg-brand-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-success-50 text-success-500">
              <FileSpreadsheet size={21} />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-ink-900">
                {excel.isPending
                  ? 'Generando Excel...'
                  : 'Descargar Excel'}
              </p>

              <p className="mt-1 text-xs text-ink-500">
                Archivo .xlsx editable
              </p>
            </div>
          </button>

          {/* PDF */}
          <button
            type="button"
            disabled={
              pdf.isPending ||
              excel.isPending ||
              rangoInvalido
            }
            onClick={() =>
              pdf.mutate({
                fechaInicio:
                  fechaInicio || undefined,
                fechaFin:
                  fechaFin || undefined,
              })
            }
            className="group flex items-center gap-4 rounded-xl border border-ink-200 bg-white p-4 text-left transition hover:border-brand-300 hover:bg-brand-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-danger-50 text-danger-500">
              <FileText size={21} />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-ink-900">
                {pdf.isPending
                  ? 'Generando PDF...'
                  : 'Descargar PDF'}
              </p>

              <p className="mt-1 text-xs text-ink-500">
                Documento listo para compartir
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* Acción alternativa */}
      <div className="flex justify-end">
        <Button
          variante="fantasma"
          onClick={limpiarFechas}
          disabled={!hayFechas}
        >
          Restablecer periodo
        </Button>
      </div>
    </div>
  )
}
