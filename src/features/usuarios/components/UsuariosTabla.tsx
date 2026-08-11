import { Link } from 'react-router-dom'
import { Table, type ColumnaTabla } from '@/components/ui/Table'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/feedback/EmptyState'
import { BadgeRol } from './BadgeRol'
import { RUTAS } from '@/constants/rutas'
import type { Usuario } from '../types/usuario.types'

interface Props {
  usuarios: Usuario[]
  onDesactivar: (id: string) => void
  onActivar: (id: string) => void
}

export function UsuariosTabla({ usuarios, onDesactivar, onActivar }: Props) {
  const columnas: ColumnaTabla<Usuario>[] = [
    { encabezado: 'Nombre', render: (u) => <Link to={RUTAS.USUARIO_DETALLE(u.id)} className="font-medium text-brand-600 hover:underline">{u.full_name}</Link> },
    { encabezado: 'Correo', render: (u) => u.email },
    { encabezado: 'Rol', render: (u) => <BadgeRol rol={u.role} /> },
    { encabezado: 'Estado', render: (u) => <Badge tono={u.is_active ? 'exito' : 'peligro'}>{u.is_active ? 'Activo' : 'Inactivo'}</Badge> },
    {
      encabezado: 'Acciones',
      render: (u) => (
        <div className="flex gap-2">
          <Link to={RUTAS.USUARIO_EDITAR(u.id)} className="text-sm text-brand-600 hover:underline">
            Editar
          </Link>
          {u.is_active ? (
            <Button variante="peligro" onClick={() => onDesactivar(u.id)} className="!px-2 !py-1 text-xs">
              Desactivar
            </Button>
          ) : (
            <Button variante="secundario" onClick={() => onActivar(u.id)} className="!px-2 !py-1 text-xs">
              Activar
            </Button>
          )}
        </div>
      ),
    },
  ]

  return (
    <Table
      columnas={columnas}
      filas={usuarios}
      obtenerLlave={(u) => u.id}
      vacio={<EmptyState titulo="No hay usuarios" descripcion="Ajusta los filtros o crea un nuevo usuario." />}
    />
  )
}
