import type { Rol } from '@/constants/roles'

/** Coincide con el perfil que devuelve /auth/login dentro de `usuario`. */
export interface UsuarioSesion {
  id: string
  full_name: string
  email: string
  role: Rol
  is_active: boolean
}

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  accessToken: string
  refreshToken: string
  usuario: UsuarioSesion
}

export interface SolicitarRecuperacionRequest {
  email: string
}

export interface RestablecerContrasenaRequest {
  accessToken: string
  nuevaContrasena: string
}
