import {
  BarChart3,
  FileDown,
  FileSpreadsheet,
  FileText,
} from 'lucide-react'

import { DescargarReporteBotones } from '../components/DescargarReporteBotones'

export function ReportesPage() {
  return (
    <div className="space-y-5">
      {/* Encabezado */}
      <header>
        <h1 className="text-2xl font-bold tracking-tight text-ink-900">
          Reportes
        </h1>

        <p className="mt-1 text-sm text-ink-500">
          Genera y descarga reportes del historial de accesos.
        </p>
      </header>

      {/* Información */}
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <article className="rounded-2xl border border-ink-200/70 bg-white p-5 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
              <BarChart3 size={19} />
            </div>

            <div>
              <p className="text-sm font-semibold text-ink-900">
                Selecciona un periodo
              </p>

              <p className="mt-1 text-xs leading-5 text-ink-500">
                Define las fechas que quieres incluir en el reporte.
              </p>
            </div>
          </div>
        </article>

        <article className="rounded-2xl border border-ink-200/70 bg-white p-5 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-success-50 text-success-500">
              <FileSpreadsheet size={19} />
            </div>

            <div>
              <p className="text-sm font-semibold text-ink-900">
                Exportar a Excel
              </p>

              <p className="mt-1 text-xs leading-5 text-ink-500">
                Ideal para análisis, filtros y procesamiento de datos.
              </p>
            </div>
          </div>
        </article>

        <article className="rounded-2xl border border-ink-200/70 bg-white p-5 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-danger-50 text-danger-500">
              <FileText size={19} />
            </div>

            <div>
              <p className="text-sm font-semibold text-ink-900">
                Exportar a PDF
              </p>

              <p className="mt-1 text-xs leading-5 text-ink-500">
                Útil para compartir, imprimir o archivar el reporte.
              </p>
            </div>
          </div>
        </article>
      </section>

      {/* Generador */}
      <section className="rounded-2xl border border-ink-200/70 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-start gap-4 border-b border-ink-200 pb-5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
            <FileDown size={21} />
          </div>

          <div>
            <h2 className="text-base font-semibold text-ink-900">
              Generar reporte
            </h2>

            <p className="mt-1 text-sm text-ink-500">
              Selecciona el periodo y el formato que deseas descargar.
            </p>
          </div>
        </div>

        <DescargarReporteBotones />
      </section>
    </div>
  )
}
