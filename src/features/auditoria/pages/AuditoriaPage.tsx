import { useState } from 'react'
import { useAuditoria } from '../hooks/useAuditoria'
import { AuditoriaFiltros } from '../components/AuditoriaFiltros'
import { AuditoriaTabla } from '../components/AuditoriaTabla'
import { LoadingState } from '@/components/feedback/LoadingState'
import { ErrorState } from '@/components/feedback/ErrorState'
import type { FiltrosAuditoria } from '../types/auditoria.types'

export function AuditoriaPage() {
  const [filtros, setFiltros] = useState<FiltrosAuditoria>({})
  const { data: eventos, isLoading, isError, refetch } = useAuditoria(filtros)

  return (
    <div>
      <h1 className="mb-4 text-xl font-semibold text-ink-900">Bitacora de auditoria</h1>
      <AuditoriaFiltros filtros={filtros} onCambiar={setFiltros} />
      {isLoading && <LoadingState />}
      {isError && <ErrorState onReintentar={() => void refetch()} />}
      {eventos && <AuditoriaTabla eventos={eventos} />}
    </div>
  )
}
