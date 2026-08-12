import {
  AlertTriangle,
  Clock3,
  Search,
  ShieldCheck,
  Users,
} from 'lucide-react'
import { useMemo, useState } from 'react'

import { usePresenciaActual } from '../hooks/usePresenciaActual'
import { useRegistrarSalida } from '../hooks/useRegistrarSalida'
import { PresenciaTabla } from '../components/PresenciaTabla'

import { LoadingState } from '@/components/feedback/LoadingState'
import { ErrorState } from '@/components/feedback/ErrorState'

export function PresenciaActualPage() {
  const [busqueda, setBusqueda] = useState('')
  const [filtro, setFiltro] = useState<
    'todos' | 'visitantes' | 'excedidos'
  >('todos')

  const {
    data: presencia = [],
    isLoading,
    isError,
    refetch,
  } = usePresenciaActual()

  const registrarSalida = useRegistrarSalida()

  const excedidos = presencia.filter(
    (registro) => registro.permanencia_excedida,
  ).length

  const visitantes = presencia.filter((registro) =>
    registro.visitors?.visitor_type
      ?.toLowerCase()
      .includes('visit'),
  ).length

  const promedioPermanencia =
    presencia.length > 0
      ? Math.round(
          presencia.reduce(
            (total, registro) =>
              total +
              (registro.minutos_transcurridos ?? 0),
            0,
          ) / presencia.length,
        )
      : 0

  const presenciaFiltrada = useMemo(() => {
    const termino = busqueda.trim().toLowerCase()

    return presencia.filter((registro) => {
      const nombre =
        registro.visitors?.full_name?.toLowerCase() ?? ''

      const documento =
        registro.visitors?.document_id?.toLowerCase() ?? ''

      const coincideBusqueda =
        termino.length === 0 ||
        nombre.includes(termino) ||
        documento.includes(termino)

      if (!coincideBusqueda) {
        return false
      }

      if (filtro === 'excedidos') {
        return Boolean(registro.permanencia_excedida)
      }

      if (filtro === 'visitantes') {
        return Boolean(
          registro.visitors?.visitor_type
            ?.toLowerCase()
            .includes('visit'),
        )
      }

      return true
    })
  }, [presencia, busqueda, filtro])

  function handleRegistrarSalida(accessLogId: string) {
    registrarSalida.mutate({
      accessLogId,
    })
  }

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
      <header>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-ink-900">
              Presencia actual
            </h1>

            <p className="mt-1 text-sm text-ink-500">
              Consulta quién se encuentra dentro de las instalaciones en este momento.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 text-sm font-medium text-success-700">
            <span className="h-2 w-2 animate-pulse rounded-full bg-success-500" />

            Actualización automática
          </div>
        </div>
      </header>

      {/* Resumen */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <ResumenCard
          titulo="Personas dentro"
          valor={presencia.length}
          descripcion="Ahora mismo"
          icono={<Users size={20} />}
          tipo="brand"
        />

        <ResumenCard
          titulo="Visitantes"
          valor={visitantes}
          descripcion="Dentro actualmente"
          icono={<ShieldCheck size={20} />}
          tipo="success"
        />

        <ResumenCard
          titulo="Permanencia excedida"
          valor={excedidos}
          descripcion={
            excedidos > 0
              ? 'Requieren atención'
              : 'Sin novedades'
          }
          icono={<AlertTriangle size={20} />}
          tipo={excedidos > 0 ? 'danger' : 'neutral'}
        />

        <ResumenCard
          titulo="Tiempo promedio"
          valor={formatearTiempoCorto(promedioPermanencia)}
          descripcion="Permanencia actual"
          icono={<Clock3 size={20} />}
          tipo="neutral"
        />
      </section>

      {/* Alerta */}
      {excedidos > 0 && (
        <section className="rounded-2xl border border-warning-500/20 bg-warning-50 p-5">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-warning-500 shadow-sm">
              <AlertTriangle size={19} />
            </div>

            <div>
              <p className="font-semibold text-ink-900">
                Hay personas con permanencia excedida
              </p>

              <p className="mt-1 text-sm text-ink-500">
                {excedidos === 1
                  ? '1 persona ha superado el tiempo de permanencia establecido.'
                  : `${excedidos} personas han superado el tiempo de permanencia establecido.`}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Filtros y tabla */}
      <section className="rounded-2xl border border-ink-200/70 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Buscador */}
          <div className="relative w-full lg:max-w-md">
            <Search
              size={17}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400"
            />

            <input
              type="search"
              value={busqueda}
              onChange={(event) =>
                setBusqueda(event.target.value)
              }
              placeholder="Buscar por nombre o documento..."
              className="h-11 w-full rounded-xl border border-ink-200 bg-surface pl-10 pr-4 text-sm text-ink-900 outline-none transition placeholder:text-ink-400 focus:border-brand-300 focus:bg-white focus:ring-4 focus:ring-brand-50"
            />
          </div>

          {/* Filtros */}
          <div className="flex flex-wrap gap-2">
            <FiltroButton
              activo={filtro === 'todos'}
              onClick={() => setFiltro('todos')}
            >
              Todos
            </FiltroButton>

            <FiltroButton
              activo={filtro === 'visitantes'}
              onClick={() =>
                setFiltro('visitantes')
              }
            >
              Visitantes
            </FiltroButton>

            <FiltroButton
              activo={filtro === 'excedidos'}
              onClick={() =>
                setFiltro('excedidos')
              }
            >
              Permanencia excedida
            </FiltroButton>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-ink-200 pt-4">
          <div>
            <h2 className="text-base font-semibold text-ink-900">
              Personas dentro
            </h2>

            <p className="mt-1 text-xs text-ink-400">
              {presenciaFiltrada.length}{' '}
              {presenciaFiltrada.length === 1
                ? 'registro encontrado'
                : 'registros encontrados'}
            </p>
          </div>
        </div>

        <div className="mt-4">
          <PresenciaTabla
            presencia={presenciaFiltrada}
            onRegistrarSalida={handleRegistrarSalida}
            cargandoSalida={registrarSalida.isPending}
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
  tipo,
}: {
  titulo: string
  valor: number | string
  descripcion: string
  icono: React.ReactNode
  tipo: 'brand' | 'success' | 'danger' | 'neutral'
}) {
  const estilos = {
    brand: 'bg-brand-50 text-brand-600',
    success: 'bg-success-50 text-success-500',
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
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${estilos[tipo]}`}
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

function formatearTiempoCorto(minutos: number) {
  if (minutos < 60) {
    return `${minutos}m`
  }

  const horas = Math.floor(minutos / 60)
  const minutosRestantes = minutos % 60

  if (minutosRestantes === 0) {
    return `${horas}h`
  }

  return `${horas}h ${minutosRestantes}m`
}