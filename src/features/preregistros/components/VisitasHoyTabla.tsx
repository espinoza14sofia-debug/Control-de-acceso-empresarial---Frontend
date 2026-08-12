import {
  CalendarClock,
  Clock3,
  FileText,
  QrCode,
  UserRound,
  XCircle,
} from 'lucide-react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/feedback/EmptyState'
import { EstadoPreregistroBadge } from './EstadoPreregistroBadge'

import { RUTAS } from '@/constants/rutas'

import type { Preregistro } from '../types/preregistro.types'

interface Props {
  preregistros: Preregistro[]
  onCancelar: (id: string) => void
  cargandoCancelacion?: boolean
}

export function VisitasHoyTabla({
  preregistros,
  onCancelar,
  cargandoCancelacion = false,
}: Props) {
  if (preregistros.length === 0) {
    return (
      <div className="rounded-xl bg-surface py-10">
        <EmptyState titulo="No hay visitas programadas para este estado" />
      </div>
    )
  }

  const ordenados = [...preregistros].sort(
    (a, b) => {
      if (!a.scheduled_time) return 1
      if (!b.scheduled_time) return -1

      return a.scheduled_time.localeCompare(
        b.scheduled_time,
      )
    },
  )

  return (
    <div className="space-y-3">
      {ordenados.map((preregistro) => (
        <article
          key={preregistro.id}
          className={[
            'rounded-xl border p-4 transition',
            preregistro.status === 'cancelado'
              ? 'border-danger-500/20 bg-danger-50/30'
              : 'border-ink-200 bg-white hover:border-brand-200 hover:bg-surface/40',
          ].join(' ')}
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Hora + visitante */}
            <div className="flex min-w-0 items-start gap-4">
              <div
                className={[
                  'flex min-w-[72px] shrink-0 flex-col items-center justify-center rounded-xl px-3 py-3',
                  preregistro.status === 'ingresado'
                    ? 'bg-success-50 text-success-700'
                    : preregistro.status === 'cancelado'
                      ? 'bg-danger-50 text-danger-700'
                      : 'bg-brand-50 text-brand-700',
                ].join(' ')}
              >
                <Clock3 size={16} />

                <span className="mt-1 text-sm font-bold">
                  {formatearHora(
                    preregistro.scheduled_time,
                  )}
                </span>
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="truncate text-sm font-semibold text-ink-900">
                    {preregistro.visitors
                      ?.full_name ??
                      'Visitante'}
                  </h3>

                  <EstadoPreregistroBadge
                    estado={preregistro.status}
                  />
                </div>

                <p className="mt-1 text-xs text-ink-400">
                  {preregistro.visitors
                    ?.document_id ??
                    'Sin documento'}
                </p>

                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-ink-500">
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarClock size={13} />
                    {formatearFecha(
                      preregistro.scheduled_date,
                    )}
                  </span>

                  <span className="inline-flex items-center gap-1.5 capitalize">
                    <UserRound size={13} />
                    {preregistro.visitors
                      ?.visitor_type ??
                      'Sin tipo'}
                  </span>

                  {preregistro.reason && (
                    <span className="inline-flex items-center gap-1.5">
                      <FileText size={13} />
                      {preregistro.reason}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Acciones */}
            <div className="flex shrink-0 flex-wrap items-center gap-2 lg:justify-end">
              <Link
                to={RUTAS.PREREGISTRO_QR(
                  preregistro.id,
                )}
                className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-brand-600 transition hover:bg-brand-50"
              >
                <QrCode size={14} />
                Ver QR
              </Link>

              {preregistro.status ===
                'pendiente' && (
                <Button
                  variante="peligro"
                  cargando={
                    cargandoCancelacion
                  }
                  onClick={() =>
                    onCancelar(
                      preregistro.id,
                    )
                  }
                  className="!px-3 !py-2 text-xs"
                >
                  <span className="inline-flex items-center gap-2">
                    <XCircle size={14} />
                    Cancelar
                  </span>
                </Button>
              )}
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}

function formatearHora(
  hora: string | null,
) {
  if (!hora) {
    return '—'
  }

  return hora.slice(0, 5)
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
      month: 'short',
    },
  )
}