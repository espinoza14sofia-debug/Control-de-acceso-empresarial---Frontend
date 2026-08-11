import { Table, type ColumnaTabla } from '@/components/ui/Table'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/feedback/EmptyState'
import { formatDuracion } from '@/utils/formatDuracion'
import type { AccessLog } from '../types/acceso.types'

interface Props {
  presencia: AccessLog[]
  onRegistrarSalida: (accessLogId: string) => void
}

/** Resalta visualmente permanencia_excedida (PBI 9.3), usando el campo real que expone el backend. */
export function PresenciaTabla({ presencia, onRegistrarSalida }: Props) {
  const columnas: ColumnaTabla<AccessLog>[] = [
    { encabezado: 'Visitante', render: (a) => a.visitors?.full_name ?? '—' },
    { encabezado: 'Entrada', render: (a) => new Date(a.entry_at).toLocaleTimeString('es-CR') },
    { encabezado: 'Tipo', render: (a) => <Badge tono="info">{a.entry_type === 'qr' ? 'QR' : 'Manual'}</Badge> },
    {
      encabezado: 'Tiempo adentro',
      render: (a) => (
        <span className={a.permanencia_excedida ? 'font-semibold text-danger-500' : ''}>
          {formatDuracion(a.minutos_transcurridos ?? 0)}
          {a.permanencia_excedida ? ' ⚠' : ''}
        </span>
      ),
    },
    {
      encabezado: 'Acciones',
      render: (a) => (
        <Button variante="peligro" onClick={() => onRegistrarSalida(a.id)} className="!px-2 !py-1 text-xs">
          Registrar salida
        </Button>
      ),
    },
  ]

  return (
    <Table
      columnas={columnas}
      filas={presencia}
      obtenerLlave={(a) => a.id}
      vacio={<EmptyState titulo="No hay nadie dentro de las instalaciones ahora mismo" />}
    />
  )
}
