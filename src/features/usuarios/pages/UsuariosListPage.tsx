import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useUsuarios } from '../hooks/useUsuarios'
import { useActivarDesactivarUsuario } from '../hooks/useActivarDesactivarUsuario'
import { UsuariosTabla } from '../components/UsuariosTabla'
import { UsuarioFiltros } from '../components/UsuarioFiltros'
import { Button } from '@/components/ui/Button'
import { LoadingState } from '@/components/feedback/LoadingState'
import { ErrorState } from '@/components/feedback/ErrorState'
import { RUTAS } from '@/constants/rutas'
import type { FiltrosUsuarios } from '../types/usuario.types'

/** Lista tanto administradores/recepcion/seguridad como empleados (rol=employee). */
export function UsuariosListPage() {
  const [filtros, setFiltros] = useState<FiltrosUsuarios>({})
  const { data: usuarios, isLoading, isError, refetch } = useUsuarios(filtros)
  const { activar, desactivar } = useActivarDesactivarUsuario()

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-ink-900">Usuarios y empleados</h1>
        <Link to={RUTAS.USUARIO_NUEVO}>
          <Button>Nuevo usuario</Button>
        </Link>
      </div>

      <UsuarioFiltros filtros={filtros} onCambiar={setFiltros} />

      {isLoading && <LoadingState />}
      {isError && <ErrorState onReintentar={() => void refetch()} />}
      {usuarios && (
        <UsuariosTabla
          usuarios={usuarios}
          onActivar={(id) => activar.mutate(id)}
          onDesactivar={(id) => desactivar.mutate(id)}
        />
      )}
    </div>
  )
}
