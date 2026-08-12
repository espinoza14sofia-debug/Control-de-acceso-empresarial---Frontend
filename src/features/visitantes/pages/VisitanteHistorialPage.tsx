import {
  ArrowLeft,
  CalendarDays,
  History,
  UserRound,
} from 'lucide-react'
import {
  Link,
  useParams,
} from 'react-router-dom'

import { useHistorialVisitante } from '../hooks/useHistorialVisitante'
import { useVisitantes } from '../hooks/useVisitantes'
import { HistorialVisitasTabla } from '../components/HistorialVisitasTabla'

import { LoadingState } from '@/components/feedback/LoadingState'
import { ErrorState } from '@/components/feedback/ErrorState'
import { RUTAS } from '@/constants/rutas'

export function VisitanteHistorialPage() {
  const { id } = useParams<{
    id: string
  }>()

  const {
    data: visitas = [],
    isLoading: cargandoHistorial,
    isError: errorHistorial,
    refetch,
  } = useHistorialVisitante(id)

  const {
    data: visitantes = [],
    isLoading: cargandoVisitantes,
  } = useVisitantes()

  const visitante = visitantes.find(
    (item) => item.id === id,
  )

  const pendientes = visitas.filter(
    (visita) =>
      visita.status === 'pendiente',
  ).length

  const ingresadas = visitas.filter(
    (visita) =>
      visita.status === 'ingresado',
  ).length

  const canceladas = visitas.filter(
    (visita) =>
      visita.status === 'cancelado',
  ).length

  if (
    cargandoHistorial ||
    cargandoVisitantes
  ) {
    return <LoadingState />
  }

  if (errorHistorial) {
    return (
      <ErrorState
        onReintentar={() =>
          void refetch()
        }
      />
    )
  }

  return (
    <div className="space-y-5">
      {/* Volver */}
      <Link
        to={RUTAS.VISITANTES}
        className="inline-flex items-center gap-2 text-sm font-medium text-ink-500 transition hover:text-brand-600"
      >
        <ArrowLeft size={16} />
        Volver a visitantes
      </Link>

      {/* Perfil */}
      <section className="relative overflow-hidden rounded-2xl border border-ink-200/70 bg-white p-6 shadow-sm">
        <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-brand-50" />

        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
            <UserRound size={28} />
          </div>

          <div className="min-w-0">
            <h1 className="text-2xl font-bold tracking-tight text-ink-900">
              {visitante?.full_name ??
                'Historial de visitante'}
            </h1>

            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-ink-500">
              {visitante && (
                <>
                  <span>
                    {visitante.document_id}
                  </span>

                  <span className="capitalize">
                    {visitante.visitor_type}
                  </span>

                  {visitante.provider_company && (
                    <span>
                      {
                        visitante.provider_company
                      }
                    </span>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Resumen */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <ResumenCard
          titulo="Total visitas"
          valor={visitas.length}
          descripcion="Historial registrado"
          icono={<History size={20} />}
          estilo="brand"
        />

        <ResumenCard
          titulo="Ingresadas"
          valor={ingresadas}
          descripcion="Visitas realizadas"
          icono={<UserRound size={20} />}
          estilo="success"
        />

        <ResumenCard
          titulo="Pendientes"
          valor={pendientes}
          descripcion="Próximas visitas"
          icono={<CalendarDays size={20} />}
          estilo="warning"
        />

        <ResumenCard
          titulo="Canceladas"
          valor={canceladas}
          descripcion="Visitas canceladas"
          icono={<CalendarDays size={20} />}
          estilo="neutral"
        />
      </section>

      {/* Historial */}
      <section className="rounded-2xl border border-ink-200/70 bg-white p-5 shadow-sm">
        <div className="mb-5">
          <h2 className="text-base font-semibold text-ink-900">
            Historial de visitas
          </h2>

          <p className="mt-1 text-xs text-ink-400">
            Actividad registrada para este visitante.
          </p>
        </div>

        <HistorialVisitasTabla
          visitas={visitas}
        />
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
    | 'neutral'
}) {
  const estilos = {
    brand:
      'bg-brand-50 text-brand-600',

    success:
      'bg-success-50 text-success-500',

    warning:
      'bg-warning-50 text-warning-500',

    neutral:
      'bg-surface text-ink-500',
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