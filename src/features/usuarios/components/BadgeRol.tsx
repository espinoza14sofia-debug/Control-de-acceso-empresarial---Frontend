import { Badge } from '@/components/ui/Badge'
import { ETIQUETA_ROL, type Rol } from '@/constants/roles'

const TONO_POR_ROL: Record<Rol, 'info' | 'exito' | 'advertencia' | 'neutro'> = {
  admin: 'info',
  receptionist: 'exito',
  security: 'advertencia',
  employee: 'neutro',
}

export function BadgeRol({ rol }: { rol: Rol }) {
  return <Badge tono={TONO_POR_ROL[rol]}>{ETIQUETA_ROL[rol]}</Badge>
}
