import { AlertTriangle, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

import { RUTAS } from '@/constants/rutas'

interface AttentionCardProps {
  pendientes: number
  excedidas: number
}

export function AttentionCard({
  pendientes,
  excedidas,
}: AttentionCardProps) {
  const hayAtencion = pendientes > 0 || excedidas > 0

  if (!hayAtencion) {
    return (
      <section className="rounded-2xl border border-success-500/20 bg-success-50 p-5">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-success-500 shadow-sm">
            ✓
          </div>

          <div>
            <p className="font-semibold text-success-700">
              Todo está bajo control
            </p>

            <p className="mt-1 text-sm text-ink-500">
              No hay situaciones pendientes que requieran atención.
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="rounded-2xl border border-warning-500/20 bg-warning-50 p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-warning-500 shadow-sm">
            <AlertTriangle size={21} />
          </div>

          <div>
            <p className="font-semibold text-ink-900">
              Requiere atención
            </p>

            <p className="mt-1 text-sm text-ink-500">
              {pendientes > 0 &&
                `${pendientes} visita${pendientes !== 1 ? 's' : ''} pendiente${pendientes !== 1 ? 's' : ''}. `}

              {excedidas > 0 &&
                `${excedidas} persona${excedidas !== 1 ? 's' : ''} con permanencia excedida.`}
            </p>
          </div>
        </div>

        <Link
          to={RUTAS.PRESENCIA}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700"
        >
          Revisar
          <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  )
}