import { Link } from 'react-router-dom'
import { Table, type ColumnaTabla } from '@/components/ui/Table'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/feedback/EmptyState'
import { TipoVisitanteBadge } from './TipoVisitanteBadge'
import { RUTAS } from '@/constants/rutas'
import type { Visitante } from '../types/visitante.types'

interface Props {
  visitantes: Visitante[]
  onEditar: (visitante: Visitante) => void
}

export function VisitantesTabla({ visitantes, onEditar }: Props) {
  const columnas: ColumnaTabla<Visitante>[] = [
    { encabezado: 'Nombre', render: (v) => v.full_name },
    { encabezado: 'Documento', render: (v) => v.document_id },
    { encabezado: 'Tipo', render: (v) => <TipoVisitanteBadge tipo={v.visitor_type} /> },
    { encabezado: 'Empresa', render: (v) => v.provider_company ?? '—' },
    {
      encabezado: 'Acciones',
      render: (v) => (
        <div className="flex gap-2">
          <Button variante="secundario" onClick={() => onEditar(v)} className="!px-2 !py-1 text-xs">
            Editar
          </Button>
          <Link to={RUTAS.VISITANTE_HISTORIAL(v.id)} className="text-sm text-brand-600 hover:underline">
            Historial
          </Link>
        </div>
      ),
    },
  ]

  return (
    <Table
      columnas={columnas}
      filas={visitantes}
      obtenerLlave={(v) => v.id}
      vacio={<EmptyState titulo="No hay visitantes registrados" />}
    />
  )
}
