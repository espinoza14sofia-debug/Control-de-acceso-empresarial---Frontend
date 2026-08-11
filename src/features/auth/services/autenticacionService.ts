import { apiClient } from '@/services/apiClient'
import type {
  LoginRequest,
  LoginResponse,
  RestablecerContrasenaRequest,
  SolicitarRecuperacionRequest,
} from '../types/auth.types'

/**
 * Corresponde 1:1 al modulo `autenticacion` del backend (prefijo /auth).
 * Ver AutenticacionController.
 */
export const autenticacionService = {
  login: async (datos: LoginRequest): Promise<LoginResponse> => {
    const { data } = await apiClient.post<LoginResponse>('/auth/login', datos)
    return data
  },

  logout: async (): Promise<void> => {
    await apiClient.post('/auth/logout')
  },

  solicitarRecuperacion: async (datos: SolicitarRecuperacionRequest): Promise<{ mensaje: string }> => {
    const { data } = await apiClient.post('/auth/recuperar-contrasena', datos)
    return data
  },

  restablecerContrasena: async (datos: RestablecerContrasenaRequest): Promise<{ mensaje: string }> => {
    const { data } = await apiClient.post('/auth/restablecer-contrasena', datos)
    return data
  },
}
