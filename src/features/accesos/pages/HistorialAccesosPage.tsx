import {
  useMemo,
  useState,
  type ReactNode,
} from 'react'

import {
  CalendarDays,
  History,
  QrCode,
  UserRound,
} from 'lucide-react'

import { useHistorialAccesos } from '../hooks/useHistorialAccesos'
import { HistorialFiltros } from '../components/HistorialFiltros'
import { HistorialTabla } from '../components/HistorialTabla'

import { LoadingState } from '@/components/feedback/LoadingState'
import { ErrorState } from '@/components/feedback/ErrorState'

import type { FiltrosHistorial } from '../types/acceso.types'

export function HistorialAccesosPage() {
  const [filtros, setFiltros] =
    useState<FiltrosHistorial>({})

  const {
    data: registros = [],
    isLoading,
    isError,
    refetch,
  } = useHistorialAccesos(filtros)

  const resumen = useMemo(() => {
    const entradasQr = registros.filter(
      (registro) => registro.entry_type === 'qr',
    ).length

    const entradasManuales = registros.filter(
      (registro) => registro.entry_type === 'manual',
    ).length

    const salidasRegistradas = registros.filter(
      (registro) => registro.exit_at !== null,
    ).length

    return {
      total: registros.length,
      entradasQr,
      entradasManuales,
      salidasRegistradas,
    }
  }, [registros])

  return (
    <div className="space-y-5">
      {/* Encabezado */}
      <header>
        <h1 className="text-2xl font-bold tracking-tight text-ink-900">
          Historial de accesos
        </h1>

        <p className="mt-1 text-sm text-ink-500">
          Consulta los ingresos y salidas registrados en las instalaciones.
        </p>
      </header>

      {/* Resumen */}
      {!isLoading && !isError && (
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <ResumenCard
            titulo="Registros"
            valor={resumen.total}
            descripcion="Según filtros actuales"
            icono={<History size={20} />}
            tipo="brand"
          />

          <ResumenCard
            titulo="Ingresos por QR"
            valor={resumen.entradasQr}
            descripcion="Accesos validados"
            icono={<QrCode size={20} />}
            tipo="success"
          />

          <ResumenCard
            titulo="Ingresos manuales"
            valor={resumen.entradasManuales}
            descripcion="Registrados manualmente"
            icono={<UserRound size={20} />}
            tipo="neutral"
          />

          <ResumenCard
            titulo="Salidas registradas"
            valor={resumen.salidasRegistradas}
            descripcion="Registros completados"
            icono={<CalendarDays size={20} />}
            tipo="neutral"
          />
        </section>
      )}

      {/* Contenedor principal */}
      <section className="rounded-2xl border border-ink-200/70 bg-white p-5 shadow-sm">
        <div className="mb-5">
          <h2 className="text-base font-semibold text-ink-900">
            Registro de actividad
          </h2>

          <p className="mt-1 text-xs text-ink-400">
            Filtra el historial por fecha o tipo de entrada.
          </p>
        </div>

        <HistorialFiltros
          filtros={filtros}
          onCambiar={setFiltros}
        />

        <div className="mt-5 border-t border-ink-200 pt-5">
          {isLoading && <LoadingState />}

          {isError && (
            <ErrorState
              onReintentar={() => void refetch()}
            />
          )}

          {!isLoading && !isError && (
            <HistorialTabla
              registros={registros}
            />
          )}
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
  tipo,
}: {
  titulo: string
  valor: number
  descripcion: string
  icono: ReactNode
  tipo: 'brand' | 'success' | 'neutral'
}) {
  const estilos = {
    brand: 'bg-brand-50 text-brand-600',
    success: 'bg-success-50 text-success-500',
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
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${estilos[tipo]}`}
        >
          {icono}
        </div>
      </div>
    </article>
  )
}