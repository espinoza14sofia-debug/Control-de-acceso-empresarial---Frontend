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
    <div className="space-y-6">
      {/* Encabezado */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-[#7F5539]">
          Bitácora de Auditoría
        </h1>

        <p className="mt-1 text-sm md:text-base text-[#9C6644]">
          Registro inmutable de eventos y cambios de seguridad en el sistema.
        </p>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-xl border border-[#DDB892]/40 shadow-[0_4px_12px_rgba(127,85,57,0.08)] p-4">
        <AuditoriaFiltros
          filtros={filtros}
          onCambiar={setFiltros}
        />
      </div>

      {/* Estados */}
      {isLoading && (
        <div className="bg-white rounded-xl border border-[#DDB892]/40 shadow-[0_4px_12px_rgba(127,85,57,0.08)] p-8">
          <LoadingState />
        </div>
      )}

      {isError && (
        <div className="bg-white rounded-xl border border-[#DDB892]/40 shadow-[0_4px_12px_rgba(127,85,57,0.08)] p-8">
          <ErrorState onReintentar={() => void refetch()} />
        </div>
      )}

      {/* Tabla */}
      {eventos && (
        <div className="bg-white rounded-xl border border-[#DDB892]/40 shadow-[0_4px_12px_rgba(127,85,57,0.08)] overflow-hidden">
          <div className="overflow-x-auto">
            <AuditoriaTabla eventos={eventos} />
          </div>
        </div>
      )}
    </div>
  )
}
