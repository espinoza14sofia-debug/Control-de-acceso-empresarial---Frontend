import { Table, type ColumnaTabla } from '@/components/ui/Table'
import { EmptyState } from '@/components/feedback/EmptyState'
import type { VisitanteFrecuente } from '../types/acceso.types'

export function VisitantesFrecuentesTabla({ datos }: { datos: VisitanteFrecuente[] }) {
  const columnas: ColumnaTabla<VisitanteFrecuente>[] = [
    { encabezado: 'Visitante', render: (v) => v.visitante?.full_name ?? '—' },
    { encabezado: 'Documento', render: (v) => v.visitante?.document_id ?? '—' },
    { encabezado: 'Cantidad de visitas', render: (v) => v.visitas },
  ]

  return (
    <Table
      columnas={columnas}
      filas={datos}
      obtenerLlave={(v) => v.visitorId}
      vacio={<EmptyState titulo="Aun no hay suficientes datos de visitas" />}
    />
  )
}
