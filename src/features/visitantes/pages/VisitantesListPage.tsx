import { useMemo, useState } from 'react'
import {
  Search,
  UserPlus,
  Users,
  UserRound,
  Building2,
} from 'lucide-react'

import { useVisitantes } from '../hooks/useVisitantes'
import { useCrearVisitante } from '../hooks/useCrearVisitante'
import { useActualizarVisitante } from '../hooks/useActualizarVisitante'
import { VisitantesTabla } from '../components/VisitantesTabla'
import { VisitanteForm } from '../components/VisitanteForm'

import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { LoadingState } from '@/components/feedback/LoadingState'
import { ErrorState } from '@/components/feedback/ErrorState'

import type {
  TipoVisitante,
  Visitante,
} from '../types/visitante.types'

type FiltroTipo = 'todos' | TipoVisitante

export function VisitantesListPage() {
  const {
    data: visitantes = [],
    isLoading,
    isError,
    refetch,
  } = useVisitantes()

  const crear = useCrearVisitante()
  const actualizar = useActualizarVisitante()

  const [modalAbierto, setModalAbierto] = useState(false)

  const [visitanteEditando, setVisitanteEditando] =
    useState<Visitante | undefined>()

  const [busqueda, setBusqueda] = useState('')

  const [filtroTipo, setFiltroTipo] =
    useState<FiltroTipo>('todos')

  const resumen = useMemo(() => {
    return {
      total: visitantes.length,

      personales: visitantes.filter(
        (visitante) =>
          visitante.visitor_type === 'personal',
      ).length,

      proveedores: visitantes.filter(
        (visitante) =>
          visitante.visitor_type === 'proveedor',
      ).length,

      contratistas: visitantes.filter(
        (visitante) =>
          visitante.visitor_type === 'contratista',
      ).length,
    }
  }, [visitantes])

  const visitantesFiltrados = useMemo(() => {
    const termino = busqueda.trim().toLowerCase()

    return visitantes.filter((visitante) => {
      const coincideBusqueda =
        termino.length === 0 ||
        visitante.full_name
          .toLowerCase()
          .includes(termino) ||
        visitante.document_id
          .toLowerCase()
          .includes(termino) ||
        visitante.provider_company
          ?.toLowerCase()
          .includes(termino)

      const coincideTipo =
        filtroTipo === 'todos' ||
        visitante.visitor_type === filtroTipo

      return coincideBusqueda && coincideTipo
    })
  }, [visitantes, busqueda, filtroTipo])

  function abrirNuevoVisitante() {
    setVisitanteEditando(undefined)
    setModalAbierto(true)
  }

  function abrirEdicion(visitante: Visitante) {
    setVisitanteEditando(visitante)
    setModalAbierto(true)
  }

  function cerrarModal() {
    setModalAbierto(false)
    setVisitanteEditando(undefined)
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
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-ink-900">
            Visitantes
          </h1>

          <p className="mt-1 text-sm text-ink-500">
            Gestiona las personas externas que ingresan a las instalaciones.
          </p>
        </div>

        <Button
          onClick={abrirNuevoVisitante}
          className="w-fit"
        >
          <span className="inline-flex items-center gap-2">
            <UserPlus size={17} />
            Registrar visitante
          </span>
        </Button>
      </header>

      {/* Indicadores */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <ResumenCard
          titulo="Total visitantes"
          valor={resumen.total}
          descripcion="Registrados"
          icono={<Users size={20} />}
          estilo="brand"
        />

        <ResumenCard
          titulo="Personal"
          valor={resumen.personales}
          descripcion="Visitas personales"
          icono={<UserRound size={20} />}
          estilo="neutral"
        />

        <ResumenCard
          titulo="Proveedores"
          valor={resumen.proveedores}
          descripcion="Empresas externas"
          icono={<Building2 size={20} />}
          estilo="success"
        />

        <ResumenCard
          titulo="Contratistas"
          valor={resumen.contratistas}
          descripcion="Servicios externos"
          icono={<Users size={20} />}
          estilo="warning"
        />
      </section>

      {/* Listado */}
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
              placeholder="Buscar por nombre, documento o empresa..."
              className="h-11 w-full rounded-xl border border-ink-200 bg-surface pl-10 pr-4 text-sm text-ink-900 outline-none transition placeholder:text-ink-400 focus:border-brand-300 focus:bg-white focus:ring-4 focus:ring-brand-50"
            />
          </div>

          {/* Filtros */}
          <div className="flex flex-wrap gap-2">
            <FiltroButton
              activo={filtroTipo === 'todos'}
              onClick={() => setFiltroTipo('todos')}
            >
              Todos
            </FiltroButton>

            <FiltroButton
              activo={filtroTipo === 'personal'}
              onClick={() =>
                setFiltroTipo('personal')
              }
            >
              Personal
            </FiltroButton>

            <FiltroButton
              activo={filtroTipo === 'proveedor'}
              onClick={() =>
                setFiltroTipo('proveedor')
              }
            >
              Proveedores
            </FiltroButton>

            <FiltroButton
              activo={filtroTipo === 'contratista'}
              onClick={() =>
                setFiltroTipo('contratista')
              }
            >
              Contratistas
            </FiltroButton>
          </div>
        </div>

        <div className="mt-5 border-t border-ink-200 pt-4">
          <div className="mb-4">
            <h2 className="text-base font-semibold text-ink-900">
              Personas registradas
            </h2>

            <p className="mt-1 text-xs text-ink-400">
              {visitantesFiltrados.length}{' '}
              {visitantesFiltrados.length === 1
                ? 'visitante encontrado'
                : 'visitantes encontrados'}
            </p>
          </div>

          <VisitantesTabla
            visitantes={visitantesFiltrados}
            onEditar={abrirEdicion}
          />
        </div>
      </section>

      {/* Modal crear / editar */}
      <Modal
        abierto={modalAbierto}
        titulo={
          visitanteEditando
            ? 'Editar visitante'
            : 'Registrar visitante'
        }
        onCerrar={cerrarModal}
      >
        <VisitanteForm
          visitanteInicial={visitanteEditando}
          cargando={
            crear.isPending ||
            actualizar.isPending
          }
          onEnviar={(datos) => {
            if (visitanteEditando) {
              actualizar.mutate(
                {
                  id: visitanteEditando.id,
                  datos,
                },
                {
                  onSuccess: cerrarModal,
                },
              )

              return
            }

            crear.mutate(datos, {
              onSuccess: cerrarModal,
            })
          }}
        />
      </Modal>
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
    brand: 'bg-brand-50 text-brand-600',
    success: 'bg-success-50 text-success-500',
    warning: 'bg-warning-50 text-warning-500',
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