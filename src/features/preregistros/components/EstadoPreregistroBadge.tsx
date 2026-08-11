import { Badge } from '@/components/ui/Badge'
import type { EstadoPreregistro } from '../types/preregistro.types'

const TONO: Record<EstadoPreregistro, 'advertencia' | 'exito' | 'peligro'> = {
  pendiente: 'advertencia',
  ingresado: 'exito',
  cancelado: 'peligro',
}

const ETIQUETA: Record<EstadoPreregistro, string> = {
  pendiente: 'Pendiente',
  ingresado: 'Ingresado',
  cancelado: 'Cancelado',
}

export function EstadoPreregistroBadge({ estado }: { estado: EstadoPreregistro }) {
  return <Badge tono={TONO[estado]}>{ETIQUETA[estado]}</Badge>
}
