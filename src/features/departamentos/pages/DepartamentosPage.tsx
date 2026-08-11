import { useState } from 'react'
import { useDepartamentos } from '../hooks/useDepartamentos'
import { useCrearDepartamento } from '../hooks/useCrearDepartamento'
import { useActualizarDepartamento } from '../hooks/useActualizarDepartamento'
import { useEliminarDepartamento } from '../hooks/useEliminarDepartamento'
import { DepartamentosTabla } from '../components/DepartamentosTabla'
import { DepartamentoForm } from '../components/DepartamentoForm'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { LoadingState } from '@/components/feedback/LoadingState'
import { ErrorState } from '@/components/feedback/ErrorState'
import type { Departamento } from '../types/departamento.types'
import { ApiError } from '@/types/api.types'

export function DepartamentosPage() {
  const { data: departamentos, isLoading, isError, refetch } = useDepartamentos()
  const crear = useCrearDepartamento()
  const actualizar = useActualizarDepartamento()
  const eliminar = useEliminarDepartamento()

  const [modalAbierto, setModalAbierto] = useState(false)
  const [departamentoEditando, setDepartamentoEditando] = useState<Departamento | undefined>()

  if (isLoading) return <LoadingState />
  if (isError) return <ErrorState onReintentar={() => void refetch()} />

  const cerrarModal = () => {
    setModalAbierto(false)
    setDepartamentoEditando(undefined)
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-ink-900">Departamentos</h1>
        <Button onClick={() => setModalAbierto(true)}>Nuevo departamento</Button>
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
              if (error instanceof ApiError) alert(error.message)
            },
          })
        }}
      />

      <Modal abierto={modalAbierto} titulo={departamentoEditando ? 'Editar departamento' : 'Nuevo departamento'} onCerrar={cerrarModal}>
        <DepartamentoForm
          departamentoInicial={departamentoEditando}
          cargando={crear.isPending || actualizar.isPending}
          onEnviar={(datos) => {
            if (departamentoEditando) {
              actualizar.mutate({ id: departamentoEditando.id, datos }, { onSuccess: cerrarModal })
            } else {
              crear.mutate(datos, { onSuccess: cerrarModal })
            }
          }}
        />
      </Modal>
    </div>
  )
}
