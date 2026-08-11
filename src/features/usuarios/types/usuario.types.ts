import type { Rol } from '@/constants/roles'

/** Coincide con la fila real de la tabla `users` devuelta por el backend. */
export interface Usuario {
  id: string
  organization_id: string
  full_name: string
  email: string
  role: Rol
  department_id: string | null
  photo_url: string | null
  is_active: boolean
  created_at: string
  updated_at: string
}

/** Coincide con CrearUsuarioDto del backend. */
export interface CrearUsuarioRequest {
  nombreCompleto: string
  email: string
  rol: Rol
  departamentoId?: string
}

/** Coincide con ActualizarUsuarioDto (PartialType de CrearUsuarioDto). */
export interface ActualizarUsuarioRequest {
  nombreCompleto?: string
  rol?: Rol
  departamentoId?: string | null
}

export interface FiltrosUsuarios {
  departamentoId?: string
  rol?: Rol
  activo?: 'true' | 'false'
  busqueda?: string
}
