import { useNavigate, useParams } from 'react-router-dom'
import { UsuarioForm } from '../components/UsuarioForm'
import { SubirFotoUsuario } from '../components/SubirFotoUsuario'
import { useUsuario } from '../hooks/useUsuario'
import { useActualizarUsuario } from '../hooks/useActualizarUsuario'
import { useDepartamentos } from '@/features/departamentos/hooks/useDepartamentos'
import { LoadingState } from '@/components/feedback/LoadingState'
import { ErrorState } from '@/components/feedback/ErrorState'
import { RUTAS } from '@/constants/rutas'

export function UsuarioEditarPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: usuario, isLoading, isError } = useUsuario(id)
  const { data: departamentos } = useDepartamentos()
  const actualizar = useActualizarUsuario()

  if (isLoading) return <LoadingState />
  if (isError || !usuario) return <ErrorState mensaje="No se pudo cargar el usuario." />

  return (
    <div className="max-w-lg">
      <h1 className="mb-4 text-xl font-semibold text-ink-900">Editar usuario</h1>
      <div className="mb-6">
        <SubirFotoUsuario usuarioId={usuario.id} fotoActual={usuario.photo_url} />
      </div>
      <UsuarioForm
        usuarioInicial={usuario}
        departamentos={departamentos ?? []}
        cargando={actualizar.isPending}
        onEnviar={(datos) =>
          actualizar.mutate(
            { id: usuario.id, datos },
            { onSuccess: () => navigate(RUTAS.USUARIOS) },
          )
        }
      />
    </div>
  )
}
