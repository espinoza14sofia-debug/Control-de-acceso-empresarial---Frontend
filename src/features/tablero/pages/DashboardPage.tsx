import type { ReactNode } from 'react'

import {
  ArrowRight,
  CalendarDays,
  DoorOpen,
  Users,
} from 'lucide-react'
import { Link } from 'react-router-dom'

import { useIndicadoresDelDia } from '../hooks/useIndicadoresDelDia'
import { IndicadoresGrid } from '../components/IndicadoresGrid'
import { ActividadAccesosChart } from '../components/ActividadAccesosChart'

import { useHistorialAccesos } from '@/features/accesos/hooks/useHistorialAccesos'
import { LoadingState } from '@/components/feedback/LoadingState'
import { ErrorState } from '@/components/feedback/ErrorState'
import { RUTAS } from '@/constants/rutas'

export function DashboardPage() {
  const hoy = obtenerFechaLocal()

  const {
    data: indicadores,
    isLoading: cargandoIndicadores,
    isError: errorIndicadores,
    refetch: refetchIndicadores,
  } = useIndicadoresDelDia()

  const {
    data: accesos = [],
    isLoading: cargandoAccesos,
    isError: errorAccesos,
    refetch: refetchAccesos,
  } = useHistorialAccesos({
    fechaInicio: hoy,
    fechaFin: hoy,
  })

  if (cargandoIndicadores) {
    return <LoadingState />
  }

  if (errorIndicadores || !indicadores) {
    return (
      <ErrorState
        onReintentar={() =>
          void refetchIndicadores()
        }
      />
    )
  }

  return (
    <div className="space-y-5">
      {/* Encabezado */}
      <header className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-ink-900">
            Dashboard
          </h1>

          <p className="mt-1 text-sm text-ink-500">
            Resumen general de las instalaciones.
          </p>
        </div>

        <p className="text-sm font-medium text-ink-400">
          {indicadores.fecha}
        </p>
      </header>

      {/* Indicadores */}
      <IndicadoresGrid indicadores={indicadores} />

      {/* Zona principal */}
      <section className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,2fr)_minmax(280px,0.8fr)]">
        {/* Gráfica real */}
        {cargandoAccesos ? (
          <article className="flex min-h-[330px] items-center justify-center rounded-2xl border border-ink-200/70 bg-white p-6 shadow-sm">
            <LoadingState />
          </article>
        ) : errorAccesos ? (
          <article className="flex min-h-[330px] items-center justify-center rounded-2xl border border-ink-200/70 bg-white p-6 shadow-sm">
            <ErrorState
              onReintentar={() =>
                void refetchAccesos()
              }
            />
          </article>
        ) : (
          <ActividadAccesosChart
            registros={accesos}
          />
        )}

        {/* Eventos */}
        <article className="rounded-2xl border border-ink-200/70 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-base font-semibold text-ink-900">
              Eventos
            </h2>

            <p className="mt-1 text-xs text-ink-400">
              Situaciones que requieren atención.
            </p>
          </div>

          <div className="space-y-5">
            <EventoResumen
              titulo="Visitas pendientes"
              valor={indicadores.visitasPendientesHoy}
              estado={
                indicadores.visitasPendientesHoy > 0
                  ? 'warning'
                  : 'normal'
              }
            />

            <EventoResumen
              titulo="Permanencia excedida"
              valor={
                indicadores.personasConPermanenciaExcedida
              }
              estado={
                indicadores.personasConPermanenciaExcedida > 0
                  ? 'danger'
                  : 'normal'
              }
            />

            <EventoResumen
              titulo="Visitas canceladas"
              valor={indicadores.visitasCanceladasHoy}
              estado="normal"
            />
          </div>

          <div className="mt-6 border-t border-ink-200 pt-4">
            <Link
              to={RUTAS.HISTORIAL_ACCESOS}
              className="group inline-flex items-center gap-2 text-sm font-semibold text-brand-600"
            >
              Ver historial

              <ArrowRight
                size={16}
                className="transition group-hover:translate-x-1"
              />
            </Link>
          </div>
        </article>
      </section>

      {/* Parte inferior */}
      <section className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        {/* Visitas */}
        <article className="rounded-2xl border border-ink-200/70 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-start justify-between">
            <div>
              <h2 className="text-base font-semibold text-ink-900">
                Visitas de hoy
              </h2>

              <p className="mt-1 text-xs text-ink-400">
                Estado de las visitas programadas.
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
              <CalendarDays size={19} />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <ResumenDato
              etiqueta="Programadas"
              valor={
                indicadores.visitasProgramadasHoy
              }
            />

            <ResumenDato
              etiqueta="Ingresaron"
              valor={
                indicadores.visitasIngresadasHoy
              }
            />

            <ResumenDato
              etiqueta="Pendientes"
              valor={
                indicadores.visitasPendientesHoy
              }
              destacado={
                indicadores.visitasPendientesHoy > 0
              }
            />
          </div>

          <div className="mt-5 border-t border-ink-200 pt-4">
            <Link
              to={RUTAS.VISITAS_HOY}
              className="group inline-flex items-center gap-2 text-sm font-semibold text-brand-600"
            >
              Ver visitas de hoy

              <ArrowRight
                size={16}
                className="transition group-hover:translate-x-1"
              />
            </Link>
          </div>
        </article>

        {/* Presencia */}
        <article className="relative overflow-hidden rounded-2xl border border-ink-200/70 bg-white p-6 shadow-sm">
          <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-brand-50" />

          <div className="relative">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-base font-semibold text-ink-900">
                  Presencia actual
                </h2>

                <p className="mt-1 text-xs text-ink-400">
                  Personas dentro de las instalaciones.
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <Users size={19} />
              </div>
            </div>

            <div className="mt-7 flex items-end gap-3">
              <p className="text-5xl font-bold tracking-tight text-ink-900">
                {
                  indicadores.personasPresentesAhora
                }
              </p>

              <p className="mb-1.5 text-sm text-ink-500">
                personas
              </p>
            </div>

            <div className="mt-7 border-t border-ink-200 pt-4">
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
      </section>

      {/* Acciones rápidas */}
      <section className="rounded-2xl border border-ink-200/70 bg-white p-5 shadow-sm">
        <div className="mb-4">
          <h2 className="text-base font-semibold text-ink-900">
            Acciones rápidas
          </h2>

          <p className="mt-1 text-xs text-ink-400">
            Accede directamente a las tareas más importantes.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <QuickAction
            to={RUTAS.CONTROL_INGRESO}
            title="Registrar entrada"
            description="Registrar un nuevo ingreso"
            icon={<DoorOpen size={18} />}
          />

          <QuickAction
            to={RUTAS.PRESENCIA}
            title="Ver presencia"
            description="Consultar quién está dentro"
            icon={<Users size={18} />}
          />

          <QuickAction
            to={RUTAS.PREREGISTRO_NUEVO}
            title="Nuevo preregistro"
            description="Programar una visita"
            icon={<CalendarDays size={18} />}
          />

          <QuickAction
            to={RUTAS.VISITAS_HOY}
            title="Visitas de hoy"
            description="Revisar visitas programadas"
            icon={<CalendarDays size={18} />}
          />
        </div>
      </section>
    </div>
  )
}

function EventoResumen({
  titulo,
  valor,
  estado,
}: {
  titulo: string
  valor: number
  estado: 'normal' | 'warning' | 'danger'
}) {
  const dot =
    estado === 'danger'
      ? 'bg-danger-500'
      : estado === 'warning'
        ? 'bg-warning-500'
        : 'bg-success-500'

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <span
          className={`h-2 w-2 rounded-full ${dot}`}
        />

        <div>
          <p className="text-sm font-medium text-ink-700">
            {titulo}
          </p>

          <p className="mt-0.5 text-xs text-ink-400">
            {valor === 0
              ? 'Sin novedades'
              : 'Requiere revisión'}
          </p>
        </div>
      </div>

      <span className="text-lg font-bold text-ink-900">
        {valor}
      </span>
    </div>
  )
}

function ResumenDato({
  etiqueta,
  valor,
  destacado = false,
}: {
  etiqueta: string
  valor: number
  destacado?: boolean
}) {
  return (
    <div className="rounded-xl bg-surface p-4">
      <p className="text-xs text-ink-500">
        {etiqueta}
      </p>

      <p
        className={[
          'mt-2 text-2xl font-bold',
          destacado
            ? 'text-warning-700'
            : 'text-ink-900',
        ].join(' ')}
      >
        {valor}
      </p>
    </div>
  )
}

function QuickAction({
  to,
  title,
  description,
  icon,
}: {
  to: string
  title: string
  description: string
  icon: ReactNode
}) {
  return (
    <Link
      to={to}
      className="group rounded-xl border border-ink-200 bg-surface p-4 transition hover:border-brand-300 hover:bg-brand-50"
    >
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-brand-600 shadow-sm">
          {icon}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <p className="font-semibold text-ink-900">
              {title}
            </p>

            <ArrowRight
              size={16}
              className="text-ink-300 transition group-hover:translate-x-1 group-hover:text-brand-600"
            />
          </div>

          <p className="mt-1 text-xs text-ink-500">
            {description}
          </p>
        </div>
      </div>
    </Link>
  )
}

function obtenerFechaLocal() {
  const ahora = new Date()

  const year = ahora.getFullYear()
  const month = String(
    ahora.getMonth() + 1,
  ).padStart(2, '0')

  const day = String(
    ahora.getDate(),
  ).padStart(2, '0')

  return `${year}-${month}-${day}`
}