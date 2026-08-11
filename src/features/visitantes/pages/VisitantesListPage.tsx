import { useState } from 'react'
import { useVisitantes } from '../hooks/useVisitantes'
import { useCrearVisitante } from '../hooks/useCrearVisitante'
import { useActualizarVisitante } from '../hooks/useActualizarVisitante'
import { VisitantesTabla } from '../components/VisitantesTabla'
import { VisitanteForm } from '../components/VisitanteForm'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { LoadingState } from '@/components/feedback/LoadingState'
import { ErrorState } from '@/components/feedback/ErrorState'
import type { Visitante } from '../types/visitante.types'

export function VisitantesListPage() {
  const { data: visitantes, isLoading, isError, refetch } = useVisitantes()
  const crear = useCrearVisitante()
  const actualizar = useActualizarVisitante()

  const [modalAbierto, setModalAbierto] = useState(false)
  const [visitanteEditando, setVisitanteEditando] = useState<Visitante | undefined>()

  if (isLoading) return <LoadingState />
  if (isError) return <ErrorState onReintentar={() => void refetch()} />

  const cerrarModal = () => {
    setModalAbierto(false)
    setVisitanteEditando(undefined)
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-ink-900">Visitantes</h1>
        <Button onClick={() => setModalAbierto(true)}>Nuevo visitante</Button>
      </div>

      <VisitantesTabla
        visitantes={visitantes ?? []}
        onEditar={(v) => {
          setVisitanteEditando(v)
          setModalAbierto(true)
        }}
      />

      <Modal abierto={modalAbierto} titulo={visitanteEditando ? 'Editar visitante' : 'Nuevo visitante'} onCerrar={cerrarModal}>
        <VisitanteForm
          visitanteInicial={visitanteEditando}
          cargando={crear.isPending || actualizar.isPending}
          onEnviar={(datos) => {
            if (visitanteEditando) {
              actualizar.mutate({ id: visitanteEditando.id, datos }, { onSuccess: cerrarModal })
            } else {
              crear.mutate(datos, { onSuccess: cerrarModal })
            }
          }}
        />
      </Modal>
    </div>
  )
}
