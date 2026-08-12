import { useState } from 'react'
import { useDepartamentos } from '../hooks/useDepartamentos'
import { useCrearDepartamento } from '../hooks/useCrearDepartamento'
import { useActualizarDepartamento } from '../hooks/useActualizarDepartamento'
import { useEliminarDepartamento } from '../hooks/useEliminarDepartamento'
import { DepartamentosTabla } from '../components/DepartamentosTabla'
import { DepartamentoForm } from '../components/DepartamentoForm'
import { Modal } from '@/components/ui/Modal'
import { LoadingState } from '@/components/feedback/LoadingState'
import { ErrorState } from '@/components/feedback/ErrorState'
import type { Departamento } from '../types/departamento.types'
import { ApiError } from '@/types/api.types'

export function DepartamentosPage() {
  const { data: departamentos, isLoading, isError, refetch } =
    useDepartamentos()

  const crear = useCrearDepartamento()
  const actualizar = useActualizarDepartamento()
  const eliminar = useEliminarDepartamento()

  const [modalAbierto, setModalAbierto] = useState(false)
  const [departamentoEditando, setDepartamentoEditando] =
    useState<Departamento | undefined>()

  if (isLoading) return <LoadingState />

  if (isError) {
    return <ErrorState onReintentar={() => void refetch()} />
  }

  const cerrarModal = () => {
    setModalAbierto(false)
    setDepartamentoEditando(undefined)
  }

  const abrirNuevo = () => {
    setDepartamentoEditando(undefined)
    setModalAbierto(true)
  }

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E6CCB2] text-[#7F5539]">
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                business
              </span>
            </div>

            <div>
              <h1 className="text-2xl font-bold text-[#7F5539]">
                Departamentos
              </h1>

              <p className="mt-1 text-sm text-[#9C6644]">
                Estructura organizacional y responsables de área.
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={abrirNuevo}
          className="flex w-fit items-center gap-2 rounded-lg bg-[#7F5539] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_4px_12px_rgba(127,85,57,0.15)] transition-colors hover:bg-[#9C6644]"
        >
          <span className="material-symbols-outlined text-[20px]">
            add
          </span>
          Nuevo departamento
        </button>
      </div>

      {/* Contenedor principal */}
      <div className="rounded-2xl border border-[#DDB892]/40 bg-white p-4 shadow-[0_4px_12px_rgba(127,85,57,0.08)] sm:p-6">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-[#7F5539]">
              Áreas de la organización
            </h2>

            <p className="mt-1 text-sm text-[#9C6644]">
              Consulta y administra los departamentos registrados.
            </p>
          </div>

          <span className="hidden rounded-full bg-[#EDE0D4] px-3 py-1 text-xs font-semibold text-[#7F5539] sm:inline-flex">
            {departamentos?.length ?? 0}{' '}
            {(departamentos?.length ?? 0) === 1
              ? 'departamento'
              : 'departamentos'}
          </span>
        </div>

        <DepartamentosTabla
          departamentos={departamentos ?? []}
          onEditar={(d) => {
            setDepartamentoEditando(d)
            setModalAbierto(true)
          }}
          onEliminar={(id) => {
            eliminar.mutate(id, {
              onError: (error) => {
                // RN-14: el backend rechaza con 409 si tiene empleados activos
                if (error instanceof ApiError) {
                  alert(error.message)
                }
              },
            })
          }}
        />
      </div>

      {/* Modal */}
      <Modal
        abierto={modalAbierto}
        titulo={
          departamentoEditando
            ? 'Editar departamento'
            : 'Nuevo departamento'
        }
        onCerrar={cerrarModal}
      >
        <DepartamentoForm
          departamentoInicial={departamentoEditando}
          cargando={crear.isPending || actualizar.isPending}
          onEnviar={(datos) => {
            if (departamentoEditando) {
              actualizar.mutate(
                {
                  id: departamentoEditando.id,
                  datos,
                },
                {
                  onSuccess: cerrarModal,
                },
              )
            } else {
              crear.mutate(datos, {
                onSuccess: cerrarModal,
              })
            }
          }}
        />
      </Modal>
    </div>
  )
}
