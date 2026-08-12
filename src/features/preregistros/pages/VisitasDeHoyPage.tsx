import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  XCircle,
} from 'lucide-react'
import { useMemo, useState } from 'react'

import { useVisitasDeHoy } from '../hooks/useVisitasDeHoy'
import { useCancelarPreregistro } from '../hooks/useCancelarPreregistro'
import { VisitasHoyTabla } from '../components/VisitasHoyTabla'

import { LoadingState } from '@/components/feedback/LoadingState'
import { ErrorState } from '@/components/feedback/ErrorState'

import type { EstadoPreregistro } from '../types/preregistro.types'

type FiltroEstado = 'todos' | EstadoPreregistro

export function VisitasDeHoyPage() {
  const {
    data: preregistros = [],
    isLoading,
    isError,
    refetch,
  } = useVisitasDeHoy()

  const cancelar = useCancelarPreregistro()

  const [filtroEstado, setFiltroEstado] =
    useState<FiltroEstado>('todos')

  const resumen = useMemo(() => {
    const pendientes = preregistros.filter(
      (preregistro) =>
        preregistro.status === 'pendiente',
    ).length

    const ingresados = preregistros.filter(
      (preregistro) =>
        preregistro.status === 'ingresado',
    ).length

    const cancelados = preregistros.filter(
      (preregistro) =>
        preregistro.status === 'cancelado',
    ).length

    return {
      total: preregistros.length,
      pendientes,
      ingresados,
      cancelados,
    }
  }, [preregistros])

  const preregistrosFiltrados = useMemo(() => {
    if (filtroEstado === 'todos') {
      return preregistros
    }

    return preregistros.filter(
      (preregistro) =>
        preregistro.status === filtroEstado,
    )
  }, [preregistros, filtroEstado])

  if (isLoading) {
    return <LoadingState />
  }

  if (isError) {
    return (
      <ErrorState
        onReintentar={() => void refetch()}
      />
    )
  }

  return (
    <div className="space-y-5">
      {/* Encabezado */}
      <header className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-ink-900">
            Visitas de hoy
          </h1>

          <p className="mt-1 text-sm text-ink-500">
            Consulta y gestiona las visitas programadas para el día.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 rounded-xl bg-brand-50 px-3 py-2 text-sm font-medium text-brand-600">
          <CalendarDays size={16} />
          {formatearFechaActual()}
        </div>
      </header>

      {/* Resumen */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <ResumenCard
          titulo="Total visitas"
          valor={resumen.total}
          descripcion="Programadas hoy"
          icono={<CalendarDays size={20} />}
          estilo="brand"
        />

        <ResumenCard
          titulo="Pendientes"
          valor={resumen.pendientes}
          descripcion={
            resumen.pendientes > 0
              ? 'Esperando ingreso'
              : 'Sin pendientes'
          }
          icono={<Clock3 size={20} />}
          estilo={
            resumen.pendientes > 0
              ? 'warning'
              : 'neutral'
          }
        />

        <ResumenCard
          titulo="Ingresadas"
          valor={resumen.ingresados}
          descripcion="Ya ingresaron"
          icono={<CheckCircle2 size={20} />}
          estilo="success"
        />

        <ResumenCard
          titulo="Canceladas"
          valor={resumen.cancelados}
          descripcion="No se realizarán"
          icono={<XCircle size={20} />}
          estilo="danger"
        />
      </section>

      {/* Agenda */}
      <section className="rounded-2xl border border-ink-200/70 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-base font-semibold text-ink-900">
              Agenda del día
            </h2>

            <p className="mt-1 text-xs text-ink-400">
              Revisa las visitas según su estado actual.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <FiltroButton
              activo={filtroEstado === 'todos'}
              onClick={() => setFiltroEstado('todos')}
            >
              Todas
            </FiltroButton>

            <FiltroButton
              activo={filtroEstado === 'pendiente'}
              onClick={() =>
                setFiltroEstado('pendiente')
              }
            >
              Pendientes
            </FiltroButton>

            <FiltroButton
              activo={filtroEstado === 'ingresado'}
              onClick={() =>
                setFiltroEstado('ingresado')
              }
            >
              Ingresadas
            </FiltroButton>

            <FiltroButton
              activo={filtroEstado === 'cancelado'}
              onClick={() =>
                setFiltroEstado('cancelado')
              }
            >
              Canceladas
            </FiltroButton>
          </div>
        </div>

        <div className="mt-5 border-t border-ink-200 pt-5">
          <div className="mb-4">
            <p className="text-xs text-ink-400">
              {preregistrosFiltrados.length}{' '}
              {preregistrosFiltrados.length === 1
                ? 'visita encontrada'
                : 'visitas encontradas'}
            </p>
          </div>

          <VisitasHoyTabla
            preregistros={preregistrosFiltrados}
            onCancelar={(id) =>
              cancelar.mutate(id)
            }
            cargandoCancelacion={cancelar.isPending}
          />
        </div>
      </section>
    </div>
  )
}

function ResumenCard({
  titulo,
  valor,
  descripcion,
  icono,
  estilo,
}: {
  titulo: string
  valor: number
  descripcion: string
  icono: React.ReactNode
  estilo:
    | 'brand'
    | 'success'
    | 'warning'
    | 'danger'
    | 'neutral'
}) {
  const estilos = {
    brand: 'bg-brand-50 text-brand-600',
    success: 'bg-success-50 text-success-500',
    warning: 'bg-warning-50 text-warning-500',
    danger: 'bg-danger-50 text-danger-500',
    neutral: 'bg-surface text-ink-500',
  }

  return (
    <article className="rounded-2xl border border-ink-200/70 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium text-ink-500">
            {titulo}
          </p>

          <p className="mt-2 text-3xl font-bold tracking-tight text-ink-900">
            {valor}
          </p>

          <p className="mt-1 text-xs text-ink-400">
            {descripcion}
          </p>
        </div>

        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${estilos[estilo]}`}
        >
          {icono}
        </div>
      </div>
    </article>
  )
}

function FiltroButton({
  activo,
  children,
  onClick,
}: {
  activo: boolean
  children: React.ReactNode
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'rounded-xl px-4 py-2 text-sm font-medium transition',
        activo
          ? 'bg-brand-600 text-white shadow-sm'
          : 'border border-ink-200 bg-white text-ink-500 hover:bg-surface hover:text-ink-900',
      ].join(' ')}
    >
      {children}
    </button>
  )
}

function formatearFechaActual() {
  return new Date().toLocaleDateString(
    'es-CR',
    {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
    },
  )
}