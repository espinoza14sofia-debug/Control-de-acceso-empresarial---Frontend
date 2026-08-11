import { useParams } from 'react-router-dom'
import { useUsuario } from '../hooks/useUsuario'
import { BadgeRol } from '../components/BadgeRol'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { LoadingState } from '@/components/feedback/LoadingState'
import { ErrorState } from '@/components/feedback/ErrorState'

export function UsuarioDetallePage() {
  const { id } = useParams<{ id: string }>()
  const { data: usuario, isLoading, isError } = useUsuario(id)

  if (isLoading) return <LoadingState />
  if (isError || !usuario) return <ErrorState mensaje="No se pudo cargar el usuario." />

  return (
    <Card className="max-w-lg">
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 overflow-hidden rounded-full bg-surface">
          {usuario.photo_url && <img src={usuario.photo_url} alt="" className="h-full w-full object-cover" />}
        </div>
        <div>
          <h1 className="text-lg font-semibold text-ink-900">{usuario.full_name}</h1>
          <p className="text-sm text-ink-500">{usuario.email}</p>
        </div>
      </div>
      <div className="mt-4 flex gap-2">
        <BadgeRol rol={usuario.role} />
        <Badge tono={usuario.is_active ? 'exito' : 'peligro'}>{usuario.is_active ? 'Activo' : 'Inactivo'}</Badge>
      </div>
    </Card>
  )
}
