import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { ROLES, ETIQUETA_ROL } from '@/constants/roles'
import type { FiltrosUsuarios } from '../types/usuario.types'

interface Props {
  filtros: FiltrosUsuarios
  onCambiar: (filtros: FiltrosUsuarios) => void
}

/** Corresponde a los query params reales de GET /usuarios (PBI 5.3). */
export function UsuarioFiltros({ filtros, onCambiar }: Props) {
  return (
    <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-4">
      <Input
        placeholder="Buscar por nombre o correo"
        value={filtros.busqueda ?? ''}
        onChange={(e) => onCambiar({ ...filtros, busqueda: e.target.value || undefined })}
      />
      <Select
        placeholder="Todos los roles"
        opciones={Object.values(ROLES).map((rol) => ({ value: rol, label: ETIQUETA_ROL[rol] }))}
        value={filtros.rol ?? ''}
        onChange={(e) => onCambiar({ ...filtros, rol: (e.target.value || undefined) as FiltrosUsuarios['rol'] })}
      />
      <Select
        placeholder="Todos los estados"
        opciones={[
          { value: 'true', label: 'Activos' },
          { value: 'false', label: 'Inactivos' },
        ]}
        value={filtros.activo ?? ''}
        onChange={(e) => onCambiar({ ...filtros, activo: (e.target.value || undefined) as FiltrosUsuarios['activo'] })}
      />
    </div>
  )
}
