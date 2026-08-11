import { useNavigate } from 'react-router-dom'
import { UsuarioForm } from '../components/UsuarioForm'
import { useCrearUsuario } from '../hooks/useCrearUsuario'
import { useDepartamentos } from '@/features/departamentos/hooks/useDepartamentos'
import { LoadingState } from '@/components/feedback/LoadingState'
import { RUTAS } from '@/constants/rutas'

export function UsuarioCrearPage() {
  const navigate = useNavigate()
  const { data: departamentos, isLoading } = useDepartamentos()
  const crear = useCrearUsuario()

  if (isLoading) return <LoadingState />

  return (
    <div className="max-w-lg">
      <h1 className="mb-4 text-xl font-semibold text-ink-900">Nuevo usuario</h1>
      <UsuarioForm
        departamentos={departamentos ?? []}
        cargando={crear.isPending}
        onEnviar={(datos) => crear.mutate(datos, { onSuccess: () => navigate(RUTAS.USUARIOS) })}
      />
    </div>
  )
}
