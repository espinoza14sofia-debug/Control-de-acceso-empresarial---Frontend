import { Input } from '@/components/ui/Input'
import type { FiltrosAuditoria } from '../types/auditoria.types'

interface Props {
  filtros: FiltrosAuditoria
  onCambiar: (filtros: FiltrosAuditoria) => void
}

/** Corresponde a los query params reales de GET /auditoria (PBI 12.2). */
export function AuditoriaFiltros({ filtros, onCambiar }: Props) {
  return (
    <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-4">
      <Input
        placeholder="Accion (ej. login, user_created)"
        value={filtros.accion ?? ''}
        onChange={(e) => onCambiar({ ...filtros, accion: e.target.value || undefined })}
      />
      <Input
        placeholder="Tipo de entidad (ej. user, department)"
        value={filtros.tipoEntidad ?? ''}
        onChange={(e) => onCambiar({ ...filtros, tipoEntidad: e.target.value || undefined })}
      />
      <Input
        type="date"
        value={filtros.fechaInicio ?? ''}
        onChange={(e) => onCambiar({ ...filtros, fechaInicio: e.target.value || undefined })}
      />
      <Input
        type="date"
        value={filtros.fechaFin ?? ''}
        onChange={(e) => onCambiar({ ...filtros, fechaFin: e.target.value || undefined })}
      />
    </div>
  )
}
