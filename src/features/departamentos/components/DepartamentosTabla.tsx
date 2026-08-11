import { Table, type ColumnaTabla } from '@/components/ui/Table'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { EmptyState } from '@/components/feedback/EmptyState'
import type { Departamento } from '../types/departamento.types'

interface Props {
  departamentos: Departamento[]
  onEditar: (departamento: Departamento) => void
  onEliminar: (id: string) => void
}

export function DepartamentosTabla({ departamentos, onEditar, onEliminar }: Props) {
  const columnas: ColumnaTabla<Departamento>[] = [
    { encabezado: 'Nombre', render: (d) => d.name },
    { encabezado: 'Descripcion', render: (d) => d.description ?? '—' },
    { encabezado: 'Estado', render: (d) => <Badge tono={d.is_active ? 'exito' : 'peligro'}>{d.is_active ? 'Activo' : 'Inactivo'}</Badge> },
    {
      encabezado: 'Acciones',
      render: (d) => (
        <div className="flex gap-2">
          <Button variante="secundario" onClick={() => onEditar(d)} className="!px-2 !py-1 text-xs">
            Editar
          </Button>
          <Button variante="peligro" onClick={() => onEliminar(d.id)} className="!px-2 !py-1 text-xs">
            Eliminar
          </Button>
        </div>
      ),
    },
  ]

  return (
    <Table
      columnas={columnas}
      filas={departamentos}
      obtenerLlave={(d) => d.id}
      vacio={<EmptyState titulo="No hay departamentos" descripcion="Crea el primero para empezar a asignar empleados." />}
    />
  )
}
