import { useState } from 'react'
import { useHistorialAccesos } from '../hooks/useHistorialAccesos'
import { HistorialFiltros } from '../components/HistorialFiltros'
import { HistorialTabla } from '../components/HistorialTabla'
import { LoadingState } from '@/components/feedback/LoadingState'
import { ErrorState } from '@/components/feedback/ErrorState'
import type { FiltrosHistorial } from '../types/acceso.types'

export function HistorialAccesosPage() {
  const [filtros, setFiltros] = useState<FiltrosHistorial>({})
  const { data: registros, isLoading, isError, refetch } = useHistorialAccesos(filtros)

  return (
    <div>
      <h1 className="mb-4 text-xl font-semibold text-ink-900">Historial de accesos</h1>
      <HistorialFiltros filtros={filtros} onCambiar={setFiltros} />
      {isLoading && <LoadingState />}
      {isError && <ErrorState onReintentar={() => void refetch()} />}
      {registros && <HistorialTabla registros={registros} />}
    </div>
  )
}
