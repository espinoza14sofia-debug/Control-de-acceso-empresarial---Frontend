import { useVisitasDeHoy } from '../hooks/useVisitasDeHoy'
import { useCancelarPreregistro } from '../hooks/useCancelarPreregistro'
import { VisitasHoyTabla } from '../components/VisitasHoyTabla'
import { LoadingState } from '@/components/feedback/LoadingState'
import { ErrorState } from '@/components/feedback/ErrorState'

export function VisitasDeHoyPage() {
  const { data: preregistros, isLoading, isError, refetch } = useVisitasDeHoy()
  const cancelar = useCancelarPreregistro()

  if (isLoading) return <LoadingState />
  if (isError) return <ErrorState onReintentar={() => void refetch()} />

  return (
    <div>
      <h1 className="mb-4 text-xl font-semibold text-ink-900">Visitas de hoy</h1>
      <VisitasHoyTabla preregistros={preregistros ?? []} onCancelar={(id) => cancelar.mutate(id)} />
    </div>
  )
}
