import { Link } from 'react-router-dom'
import { Table, type ColumnaTabla } from '@/components/ui/Table'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/feedback/EmptyState'
import { EstadoPreregistroBadge } from './EstadoPreregistroBadge'
import { RUTAS } from '@/constants/rutas'
import type { Preregistro } from '../types/preregistro.types'

interface Props {
  preregistros: Preregistro[]
  onCancelar: (id: string) => void
}

export function VisitasHoyTabla({ preregistros, onCancelar }: Props) {
  const columnas: ColumnaTabla<Preregistro>[] = [
    { encabezado: 'Hora', render: (p) => p.scheduled_time ?? '—' },
    { encabezado: 'Visitante', render: (p) => p.visitors?.full_name ?? '—' },
    { encabezado: 'Motivo', render: (p) => p.reason ?? '—' },
    { encabezado: 'Estado', render: (p) => <EstadoPreregistroBadge estado={p.status} /> },
    {
      encabezado: 'Acciones',
      render: (p) => (
        <div className="flex gap-2">
          <Link to={RUTAS.PREREGISTRO_QR(p.id)} className="text-sm text-brand-600 hover:underline">
            Ver QR
          </Link>
          {p.status === 'pendiente' && (
            <Button variante="peligro" onClick={() => onCancelar(p.id)} className="!px-2 !py-1 text-xs">
              Cancelar
            </Button>
          )}
        </div>
      ),
    },
  ]

  return (
    <Table
      columnas={columnas}
      filas={preregistros}
      obtenerLlave={(p) => p.id}
      vacio={<EmptyState titulo="No hay visitas programadas para hoy" />}
    />
  )
}
