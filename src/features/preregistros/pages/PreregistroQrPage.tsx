import { useParams } from 'react-router-dom'
import { useGenerarQr } from '../hooks/useGenerarQr'
import { QrDisplay } from '../components/QrDisplay'
import { LoadingState } from '@/components/feedback/LoadingState'
import { ErrorState } from '@/components/feedback/ErrorState'

export function PreregistroQrPage() {
  const { id } = useParams<{ id: string }>()
  const { data: qr, isLoading, isError, refetch } = useGenerarQr(id)

  if (isLoading) return <LoadingState />
  if (isError || !qr) return <ErrorState onReintentar={() => void refetch()} />

  return (
    <div>
      <h1 className="mb-4 text-xl font-semibold text-ink-900">Codigo QR de la visita</h1>
      <QrDisplay qr={qr} />
    </div>
  )
}
