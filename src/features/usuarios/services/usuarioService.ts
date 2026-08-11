import { apiClient, subirArchivo } from '@/services/apiClient'
import type {
  ActualizarUsuarioRequest,
  CrearUsuarioRequest,
  FiltrosUsuarios,
  Usuario,
} from '../types/usuario.types'

/**
 * Corresponde 1:1 al modulo `usuarios` del backend (prefijo /usuarios).
 * Un "empleado" es un Usuario con rol=employee -- no existe un modulo
 * ni endpoint separado para empleados (ver UsuariosController).
 */
export const usuarioService = {
  listar: async (filtros: FiltrosUsuarios = {}): Promise<Usuario[]> => {
    const { data } = await apiClient.get<Usuario[]>('/usuarios', { params: filtros })
    return data
  },

  obtenerPorId: async (id: string): Promise<Usuario> => {
    const { data } = await apiClient.get<Usuario>(`/usuarios/${id}`)
    return data
  },

  crear: async (datos: CrearUsuarioRequest): Promise<Usuario> => {
    const { data } = await apiClient.post<Usuario>('/usuarios', datos)
    return data
  },

  actualizar: async (id: string, datos: ActualizarUsuarioRequest): Promise<Usuario> => {
    const { data } = await apiClient.patch<Usuario>(`/usuarios/${id}`, datos)
    return data
  },

  desactivar: async (id: string): Promise<Usuario> => {
    const { data } = await apiClient.patch<Usuario>(`/usuarios/${id}/desactivar`)
    return data
  },

  activar: async (id: string): Promise<Usuario> => {
    const { data } = await apiClient.patch<Usuario>(`/usuarios/${id}/activar`)
    return data
  },

  subirFoto: async (id: string, archivo: File): Promise<Usuario> => {
    return subirArchivo(`/usuarios/${id}/foto`, 'foto', archivo)
  },
}
