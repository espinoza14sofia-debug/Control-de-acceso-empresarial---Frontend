import { useVisitantesFrecuentes } from '../hooks/useVisitantesFrecuentes'
import { VisitantesFrecuentesTabla } from '../components/VisitantesFrecuentesTabla'
import { LoadingState } from '@/components/feedback/LoadingState'
import { ErrorState } from '@/components/feedback/ErrorState'

export function VisitantesFrecuentesPage() {
  const { data, isLoading, isError, refetch } = useVisitantesFrecuentes(10)

  if (isLoading) return <LoadingState />
  if (isError) return <ErrorState onReintentar={() => void refetch()} />

  return (
    <div>
      <h1 className="mb-4 text-xl font-semibold text-ink-900">Visitantes frecuentes</h1>
      <VisitantesFrecuentesTabla datos={data ?? []} />
    </div>
  )
}
