import {
  ArrowRight,
  CircleCheck,
  Clock3,
  Users,
} from 'lucide-react'
import { Link } from 'react-router-dom'

import { RUTAS } from '@/constants/rutas'

interface EstadoInstalacionesProps {
  presentes: number
  pendientes: number
  excedidas: number
}

export function EstadoInstalaciones({
  presentes,
  pendientes,
  excedidas,
}: EstadoInstalacionesProps) {
  const todoEnOrden = pendientes === 0 && excedidas === 0

  return (
    <section>
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-ink-900">
          ¿Qué está pasando ahora?
        </h2>

        <p className="mt-1 text-sm text-ink-500">
          Estado operativo de las instalaciones en este momento.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1.4fr_1fr]">
        {/* Estado operativo */}
        <article className="rounded-2xl border border-ink-200/70 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-ink-500">
                Estado operativo
              </p>

              <h3 className="mt-2 text-xl font-semibold text-ink-900">
                {todoEnOrden
                  ? 'Todo está bajo control'
                  : 'Hay situaciones por revisar'}
              </h3>

              <p className="mt-2 max-w-xl text-sm leading-6 text-ink-500">
                {todoEnOrden
                  ? 'No hay visitas pendientes ni permanencias excedidas en este momento.'
                  : 'Revisa las situaciones pendientes para mantener el control de las instalaciones.'}
              </p>
            </div>

            <div
              className={[
                'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl',
                todoEnOrden
                  ? 'bg-success-50 text-success-500'
                  : 'bg-warning-50 text-warning-500',
              ].join(' ')}
            >
              {todoEnOrden ? (
                <CircleCheck size={21} />
              ) : (
                <Clock3 size={21} />
              )}
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-xl bg-surface p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-ink-400">
                Visitas pendientes
              </p>

              <p className="mt-2 text-2xl font-bold text-ink-900">
                {pendientes}
              </p>
            </div>

            <div className="rounded-xl bg-surface p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-ink-400">
                Permanencia excedida
              </p>

              <p
                className={[
                  'mt-2 text-2xl font-bold',
                  excedidas > 0
                    ? 'text-danger-700'
                    : 'text-ink-900',
                ].join(' ')}
              >
                {excedidas}
              </p>
            </div>
          </div>
        </article>

        {/* Presencia */}
        <article className="relative overflow-hidden rounded-2xl border border-ink-200/70 bg-white p-6 shadow-sm">
          <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-brand-50" />

          <div className="relative flex h-full flex-col">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-ink-500">
                  Presencia
                </p>

                <p className="mt-1 text-sm text-ink-400">
                  Personas dentro ahora
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <Users size={21} />
              </div>
            </div>

            <div className="my-7">
              <div className="flex items-end gap-3">
                <p className="text-5xl font-bold tracking-tight text-ink-900">
                  {presentes}
                </p>

                <p className="mb-1.5 text-sm text-ink-500">
                  personas
                </p>
              </div>
            </div>

            <div className="mt-auto border-t border-ink-200 pt-4">
              <Link
                to={RUTAS.PRESENCIA}
                className="group inline-flex items-center gap-2 text-sm font-semibold text-brand-600"
              >
                Ver presencia actual

                <ArrowRight
                  size={16}
                  className="transition group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}