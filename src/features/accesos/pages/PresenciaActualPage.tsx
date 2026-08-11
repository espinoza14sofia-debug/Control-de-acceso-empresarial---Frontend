import { usePresenciaActual } from '../hooks/usePresenciaActual'
import { useRegistrarSalida } from '../hooks/useRegistrarSalida'
import { PresenciaTabla } from '../components/PresenciaTabla'
import { LoadingState } from '@/components/feedback/LoadingState'
import { ErrorState } from '@/components/feedback/ErrorState'

export function PresenciaActualPage() {
  const { data: presencia, isLoading, isError, refetch } = usePresenciaActual()
  const registrarSalida = useRegistrarSalida()

  if (isLoading) return <LoadingState />
  if (isError) return <ErrorState onReintentar={() => void refetch()} />

  return (
    <div>
      <h1 className="mb-4 text-xl font-semibold text-ink-900">Presencia actual</h1>
      <PresenciaTabla
        presencia={presencia ?? []}
        onRegistrarSalida={(accessLogId) => registrarSalida.mutate({ accessLogId })}
      />
    </div>
  )
}
