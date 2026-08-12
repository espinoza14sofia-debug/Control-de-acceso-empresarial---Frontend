import { useMutation } from '@tanstack/react-query'
import { useAuth } from '@/hooks/useAuth'
import { usuarioService } from '@/features/usuarios/services/usuarioService'

interface DatosPerfil {
    nombreCompleto: string
}

/**
 * Edita el perfil propio. Reusa usuarioService (mismo endpoint PATCH
 * /usuarios/:id que usa el modulo de Usuarios) pero solo expone el
 * nombre: el rol no es autoeditable, y el email/foto se manejan aparte.
 */
export function useActualizarPerfil() {
    const { usuario, actualizarUsuarioSesion } = useAuth()

    return useMutation({
        mutationFn: (datos: DatosPerfil) => {
            if (!usuario) throw new Error('No hay sesion activa')
            return usuarioService.actualizar(usuario.id, { nombreCompleto: datos.nombreCompleto })
        },
        onSuccess: (usuarioActualizado) => {
            actualizarUsuarioSesion({ full_name: usuarioActualizado.full_name })
        },
    })
}