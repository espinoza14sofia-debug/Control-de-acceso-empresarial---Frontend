import {
  CalendarDays,
  Clock3,
  UserRound,
} from 'lucide-react'

import { EmptyState } from '@/components/feedback/EmptyState'

import type { VisitaHistorial } from '../types/visitante.types'

export function HistorialVisitasTabla({
  visitas,
}: {
  visitas: VisitaHistorial[]
}) {
  if (visitas.length === 0) {
    return (
      <div className="rounded-xl bg-surface py-10">
        <EmptyState titulo="Esta persona aún no tiene visitas registradas" />
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {visitas.map((visita) => (
        <article
          key={visita.id}
          className="rounded-xl border border-ink-200 bg-white p-4 transition hover:border-brand-200 hover:bg-surface/40"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-3">
              <div
                className={[
                  'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl',
                  visita.status ===
                  'ingresado'
                    ? 'bg-success-50 text-success-500'
                    : visita.status ===
                        'pendiente'
                      ? 'bg-warning-50 text-warning-500'
                      : 'bg-danger-50 text-danger-500',
                ].join(' ')}
              >
                <CalendarDays size={18} />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-semibold text-ink-900">
                    {formatearFecha(
                      visita.scheduled_date,
                    )}
                  </p>

                  <EstadoVisita
                    estado={visita.status}
                  />
                </div>

                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-xs text-ink-500">
                  <span className="inline-flex items-center gap-1.5">
                    <Clock3 size={13} />

                    {visita.scheduled_time ??
                      'Sin hora'}
                  </span>

                  <span className="inline-flex items-center gap-1.5">
                    <UserRound size={13} />

                    {visita.users
                      ?.full_name ??
                      'Sin anfitrión'}
                  </span>
                </div>

                {visita.reason && (
                  <p className="mt-3 text-sm leading-6 text-ink-600">
                    {visita.reason}
                  </p>
                )}
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}

function EstadoVisita({
  estado,
}: {
  estado:
    | 'pendiente'
    | 'ingresado'
    | 'cancelado'
}) {
  const estilos = {
    pendiente:
      'bg-warning-50 text-warning-700',

    ingresado:
      'bg-success-50 text-success-700',

    cancelado:
      'bg-danger-50 text-danger-700',
  }

  const etiquetas = {
    pendiente: 'Pendiente',
    ingresado: 'Ingresado',
    cancelado: 'Cancelado',
  }

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${estilos[estado]}`}
    >
      {etiquetas[estado]}
    </span>
  )
}

function formatearFecha(
  fecha: string,
) {
  const [year, month, day] =
    fecha.split('-').map(Number)

  const fechaLocal = new Date(
    year,
    month - 1,
    day,
  )

  return fechaLocal.toLocaleDateString(
    'es-CR',
    {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    },
  )
}