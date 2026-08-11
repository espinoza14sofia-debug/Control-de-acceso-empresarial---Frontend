import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import type { FiltrosHistorial } from '../types/acceso.types'

interface Props {
  filtros: FiltrosHistorial
  onCambiar: (filtros: FiltrosHistorial) => void
}

/** Corresponde a los query params reales de GET /accesos/historial (PBI 11.1). */
export function HistorialFiltros({ filtros, onCambiar }: Props) {
  return (
    <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
      <Input
        etiqueta="Desde"
        type="date"
        value={filtros.fechaInicio ?? ''}
        onChange={(e) => onCambiar({ ...filtros, fechaInicio: e.target.value || undefined })}
      />
      <Input
        etiqueta="Hasta"
        type="date"
        value={filtros.fechaFin ?? ''}
        onChange={(e) => onCambiar({ ...filtros, fechaFin: e.target.value || undefined })}
      />
      <Select
        etiqueta="Tipo de entrada"
        placeholder="Todos"
        opciones={[
          { value: 'qr', label: 'QR' },
          { value: 'manual', label: 'Manual' },
        ]}
        value={filtros.tipoEntrada ?? ''}
        onChange={(e) => onCambiar({ ...filtros, tipoEntrada: (e.target.value || undefined) as FiltrosHistorial['tipoEntrada'] })}
      />
    </div>
  )
}
