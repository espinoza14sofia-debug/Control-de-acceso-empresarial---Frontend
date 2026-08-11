import { Table, type ColumnaTabla } from '@/components/ui/Table'
import { Badge } from '@/components/ui/Badge'
import { EmptyState } from '@/components/feedback/EmptyState'
import type { VisitaHistorial } from '../types/visitante.types'

const TONO_ESTADO: Record<VisitaHistorial['status'], 'advertencia' | 'exito' | 'peligro'> = {
  pendiente: 'advertencia',
  ingresado: 'exito',
  cancelado: 'peligro',
}

export function HistorialVisitasTabla({ visitas }: { visitas: VisitaHistorial[] }) {
  const columnas: ColumnaTabla<VisitaHistorial>[] = [
    { encabezado: 'Fecha', render: (v) => v.scheduled_date },
    { encabezado: 'Hora', render: (v) => v.scheduled_time ?? '—' },
    { encabezado: 'Motivo', render: (v) => v.reason ?? '—' },
    { encabezado: 'Anfitrion', render: (v) => v.users?.full_name ?? '—' },
    { encabezado: 'Estado', render: (v) => <Badge tono={TONO_ESTADO[v.status]}>{v.status}</Badge> },
  ]

  return (
    <Table
      columnas={columnas}
      filas={visitas}
      obtenerLlave={(v) => v.id}
      vacio={<EmptyState titulo="Esta persona aun no tiene visitas registradas" />}
    />
  )
}
