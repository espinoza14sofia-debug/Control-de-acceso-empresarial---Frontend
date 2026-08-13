import { Table, type ColumnaTabla } from '@/components/ui/Table'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/feedback/EmptyState'
import type { EventoAuditoria } from '../types/auditoria.types'

interface Props {
    eventos: EventoAuditoria[]
    onVerDetalle: (evento: EventoAuditoria) => void
}

export function AuditoriaTabla({ eventos, onVerDetalle }: Props) {
    const columnas: ColumnaTabla<EventoAuditoria>[] = [
        { encabezado: 'Fecha', render: (e) => new Date(e.created_at).toLocaleString('es-CR') },
        { encabezado: 'Usuario', render: (e) => e.users?.full_name ?? '—' },
        { encabezado: 'Accion', render: (e) => e.action },
        { encabezado: 'Entidad', render: (e) => e.entity_type ?? '—' },
        {
            encabezado: 'Detalle',
            render: (e) => (
                <Button variante="secundario" onClick={() => onVerDetalle(e)} className="!px-2 !py-1 text-xs">
                    Ver detalle
                </Button>
            ),
        },
    ]

    return (
        <Table
            columnas={columnas}
            filas={eventos}
            obtenerLlave={(e) => e.id}
            vacio={<EmptyState titulo="No hay eventos para los filtros seleccionados" />}
        />
    )
}