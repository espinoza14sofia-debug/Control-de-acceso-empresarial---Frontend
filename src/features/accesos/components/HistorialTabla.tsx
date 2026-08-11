import { Table, type ColumnaTabla } from '@/components/ui/Table'
import { Badge } from '@/components/ui/Badge'
import { EmptyState } from '@/components/feedback/EmptyState'
import type { AccessLog } from '../types/acceso.types'

export function HistorialTabla({ registros }: { registros: AccessLog[] }) {
  const columnas: ColumnaTabla<AccessLog>[] = [
    { encabezado: 'Visitante', render: (a) => a.visitors?.full_name ?? '—' },
    { encabezado: 'Tipo', render: (a) => <Badge tono="info">{a.entry_type === 'qr' ? 'QR' : 'Manual'}</Badge> },
    { encabezado: 'Entrada', render: (a) => new Date(a.entry_at).toLocaleString('es-CR') },
    { encabezado: 'Salida', render: (a) => (a.exit_at ? new Date(a.exit_at).toLocaleString('es-CR') : 'Aun adentro') },
  ]

  return (
    <Table
      columnas={columnas}
      filas={registros}
      obtenerLlave={(a) => a.id}
      vacio={<EmptyState titulo="No hay registros para los filtros seleccionados" />}
    />
  )
}
