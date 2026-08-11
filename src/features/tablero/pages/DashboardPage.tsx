import { useIndicadoresDelDia } from '../hooks/useIndicadoresDelDia'
import { IndicadoresGrid } from '../components/IndicadoresGrid'
import { LoadingState } from '@/components/feedback/LoadingState'
import { ErrorState } from '@/components/feedback/ErrorState'

export function DashboardPage() {
  const { data: indicadores, isLoading, isError, refetch } = useIndicadoresDelDia()

  if (isLoading) return <LoadingState />
  if (isError || !indicadores) return <ErrorState onReintentar={() => void refetch()} />

  return (
    <div>
      <h1 className="mb-1 text-xl font-semibold text-ink-900">Dashboard</h1>
      <p className="mb-4 text-sm text-ink-500">{indicadores.fecha}</p>
      <IndicadoresGrid indicadores={indicadores} />
    </div>
  )
}
