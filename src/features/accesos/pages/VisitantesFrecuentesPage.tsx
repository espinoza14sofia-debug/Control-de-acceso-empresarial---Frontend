import type { ReactNode } from 'react'

import {
  Award,
  Medal,
  TrendingUp,
  Users,
} from 'lucide-react'

import { useVisitantesFrecuentes } from '../hooks/useVisitantesFrecuentes'
import { VisitantesFrecuentesTabla } from '../components/VisitantesFrecuentesTabla'

import { LoadingState } from '@/components/feedback/LoadingState'
import { ErrorState } from '@/components/feedback/ErrorState'

export function VisitantesFrecuentesPage() {
  const {
    data = [],
    isLoading,
    isError,
    refetch,
  } = useVisitantesFrecuentes(10)

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

  const primero = data[0]
  const segundo = data[1]
  const tercero = data[2]

  const totalVisitas = data.reduce(
    (total, visitante) =>
      total + visitante.visitas,
    0,
  )

  return (
    <div className="space-y-5">
      {/* Encabezado */}
      <header>
        <h1 className="text-2xl font-bold tracking-tight text-ink-900">
          Visitantes frecuentes
        </h1>

        <p className="mt-1 text-sm text-ink-500">
          Identifica las personas que visitan las instalaciones con mayor frecuencia.
        </p>
      </header>

      {/* Resumen */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <ResumenCard
          titulo="Visitantes registrados"
          valor={data.length}
          descripcion="En el ranking actual"
          icono={<Users size={20} />}
          tipo="brand"
        />

        <ResumenCard
          titulo="Visitas acumuladas"
          valor={totalVisitas}
          descripcion="Entre los más frecuentes"
          icono={<TrendingUp size={20} />}
          tipo="success"
        />

        <ResumenCard
          titulo="Mayor frecuencia"
          valor={primero?.visitas ?? 0}
          descripcion="Visitas del primer lugar"
          icono={<Award size={20} />}
          tipo="warning"
        />
      </section>

      {/* Podio */}
      {data.length > 0 && (
        <section>
          <div className="mb-4">
            <h2 className="text-base font-semibold text-ink-900">
              Más frecuentes
            </h2>

            <p className="mt-1 text-xs text-ink-400">
              Visitantes con mayor número de ingresos registrados.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <PodioCard
              posicion={1}
              nombre={
                primero?.visitante?.full_name ??
                'Visitante'
              }
              documento={
                primero?.visitante?.document_id ??
                'Sin documento'
              }
              visitas={primero?.visitas ?? 0}
            />

            {segundo && (
              <PodioCard
                posicion={2}
                nombre={
                  segundo.visitante?.full_name ??
                  'Visitante'
                }
                documento={
                  segundo.visitante?.document_id ??
                  'Sin documento'
                }
                visitas={segundo.visitas}
              />
            )}

            {tercero && (
              <PodioCard
                posicion={3}
                nombre={
                  tercero.visitante?.full_name ??
                  'Visitante'
                }
                documento={
                  tercero.visitante?.document_id ??
                  'Sin documento'
                }
                visitas={tercero.visitas}
              />
            )}
          </div>
        </section>
      )}

      {/* Ranking completo */}
      <section className="rounded-2xl border border-ink-200/70 bg-white p-5 shadow-sm">
        <div className="mb-5">
          <h2 className="text-base font-semibold text-ink-900">
            Ranking completo
          </h2>

          <p className="mt-1 text-xs text-ink-400">
            Los 10 visitantes con mayor frecuencia.
          </p>
        </div>

        <VisitantesFrecuentesTabla datos={data} />
      </section>
    </div>
  )
}

function PodioCard({
  posicion,
  nombre,
  documento,
  visitas,
}: {
  posicion: 1 | 2 | 3
  nombre: string
  documento: string
  visitas: number
}) {
  const estilos = {
    1: {
      fondo: 'bg-warning-50',
      icono: 'text-warning-500',
      etiqueta: '1.er lugar',
    },
    2: {
      fondo: 'bg-surface',
      icono: 'text-ink-500',
      etiqueta: '2.º lugar',
    },
    3: {
      fondo: 'bg-brand-50',
      icono: 'text-brand-500',
      etiqueta: '3.er lugar',
    },
  }

  const estilo = estilos[posicion]

  return (
    <article className="rounded-2xl border border-ink-200/70 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${estilo.fondo} ${estilo.icono}`}
        >
          <Medal size={21} />
        </div>

        <span className="rounded-full bg-surface px-3 py-1 text-xs font-semibold text-ink-500">
          {estilo.etiqueta}
        </span>
      </div>

      <div className="mt-5">
        <p className="truncate text-base font-semibold text-ink-900">
          {nombre}
        </p>

        <p className="mt-1 text-xs text-ink-400">
          {documento}
        </p>
      </div>

      <div className="mt-5 border-t border-ink-200 pt-4">
        <span className="text-2xl font-bold text-ink-900">
          {visitas}
        </span>

        <span className="ml-2 text-sm text-ink-500">
          {visitas === 1
            ? 'visita'
            : 'visitas'}
        </span>
      </div>
    </article>
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
  icono: React.ReactNode
  tipo: 'brand' | 'success' | 'warning'
}) {
  const estilos = {
    brand: 'bg-brand-50 text-brand-600',
    success: 'bg-success-50 text-success-500',
    warning: 'bg-warning-50 text-warning-500',
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
