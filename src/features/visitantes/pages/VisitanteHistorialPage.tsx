import { useParams } from 'react-router-dom'
import { useHistorialVisitante } from '../hooks/useHistorialVisitante'
import { HistorialVisitasTabla } from '../components/HistorialVisitasTabla'
import { LoadingState } from '@/components/feedback/LoadingState'
import { ErrorState } from '@/components/feedback/ErrorState'

export function VisitanteHistorialPage() {
  const { id } = useParams<{ id: string }>()
  const { data: visitas, isLoading, isError, refetch } = useHistorialVisitante(id)

  if (isLoading) return <LoadingState />
  if (isError) return <ErrorState onReintentar={() => void refetch()} />

  return (
    <div>
      <h1 className="mb-4 text-xl font-semibold text-ink-900">Historial de visitas</h1>
      <HistorialVisitasTabla visitas={visitas ?? []} />
    </div>
  )
}
