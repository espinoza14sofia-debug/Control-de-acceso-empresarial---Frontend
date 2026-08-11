import { Badge } from '@/components/ui/Badge'
import type { TipoVisitante } from '../types/visitante.types'

const ETIQUETA: Record<TipoVisitante, string> = {
  personal: 'Personal',
  proveedor: 'Proveedor',
  contratista: 'Contratista',
}

const TONO: Record<TipoVisitante, 'neutro' | 'info' | 'advertencia'> = {
  personal: 'neutro',
  proveedor: 'info',
  contratista: 'advertencia',
}

export function TipoVisitanteBadge({ tipo }: { tipo: TipoVisitante }) {
  return <Badge tono={TONO[tipo]}>{ETIQUETA[tipo]}</Badge>
}
