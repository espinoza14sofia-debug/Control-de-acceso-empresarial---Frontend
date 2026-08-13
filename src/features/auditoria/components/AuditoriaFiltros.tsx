import { Input } from '@/components/ui/Input'
import { useUsuarios } from '@/features/usuarios/hooks/useUsuarios'
import type { FiltrosAuditoria } from '../types/auditoria.types'

interface Props {
    filtros: FiltrosAuditoria
    onCambiar: (filtros: FiltrosAuditoria) => void
}

/** Corresponde a los query params reales de GET /auditoria (PBI 12.2). */
export function AuditoriaFiltros({ filtros, onCambiar }: Props) {
    const { data: usuarios } = useUsuarios()

    return (
        <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-5">
            <select
                value={filtros.usuarioId ?? ''}
                onChange={(e) => onCambiar({ ...filtros, usuarioId: e.target.value || undefined })}
                className="h-10 rounded-md border border-ink-300 bg-white px-3 text-sm text-ink-900 outline-none focus:border-brand-300 focus:ring-4 focus:ring-brand-50"
            >
                <option value="">Todos los usuarios</option>
                {usuarios?.map((u) => (
                    <option key={u.id} value={u.id}>
                        {u.full_name}
                    </option>
                ))}
            </select>

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