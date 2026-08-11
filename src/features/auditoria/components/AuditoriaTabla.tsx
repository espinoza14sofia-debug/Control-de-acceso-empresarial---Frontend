import { Table, type ColumnaTabla } from '@/components/ui/Table'
import { EmptyState } from '@/components/feedback/EmptyState'
import type { EventoAuditoria } from '../types/auditoria.types'

export function AuditoriaTabla({ eventos }: { eventos: EventoAuditoria[] }) {
  const columnas: ColumnaTabla<EventoAuditoria>[] = [
    { encabezado: 'Fecha', render: (e) => new Date(e.created_at).toLocaleString('es-CR') },
    { encabezado: 'Usuario', render: (e) => e.users?.full_name ?? '—' },
    { encabezado: 'Accion', render: (e) => e.action },
    { encabezado: 'Entidad', render: (e) => e.entity_type ?? '—' },
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
