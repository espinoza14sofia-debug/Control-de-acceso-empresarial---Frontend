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
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#7f5539]">
            Usuarios
          </h1>

          <p className="mt-1 text-sm text-[#9c6644]">
            Gestiona los usuarios, empleados y sus accesos a la organización.
          </p>
        </div>

        <Link to={RUTAS.USUARIO_NUEVO}>
          <Button
            className="flex items-center gap-2 rounded-lg bg-[#7f5539] px-5 py-2.5 text-white shadow-sm transition-colors hover:bg-[#9c6644]"
          >
            <span className="material-symbols-outlined text-[20px]">
              add
            </span>
            Nuevo usuario
          </Button>
        </Link>
      </div>

      {/* Filtros */}
      <UsuarioFiltros
        filtros={filtros}
        onCambiar={setFiltros}
      />

      {/* Estados */}
      {isLoading && <LoadingState />}

      {isError && (
        <ErrorState onReintentar={() => void refetch()} />
      )}

      {/* Tabla */}
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
