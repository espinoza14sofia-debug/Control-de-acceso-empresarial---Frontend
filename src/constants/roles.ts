/**
 * Roles reales definidos en el backend (ver CrearUsuarioDto -> RolUsuario).
 * No es un enum de TypeScript a propósito: el proyecto usa erasableSyntaxOnly,
 * y un union type de strings es más liviano y compatible.
 */
export const ROLES = {
  ADMIN: 'admin',
  RECEPTIONIST: 'receptionist',
  SECURITY: 'security',
  EMPLOYEE: 'employee',
} as const

export type Rol = (typeof ROLES)[keyof typeof ROLES]

export const TODOS_LOS_ROLES: Rol[] = [ROLES.ADMIN, ROLES.RECEPTIONIST, ROLES.SECURITY, ROLES.EMPLOYEE]

export const ETIQUETA_ROL: Record<Rol, string> = {
  admin: 'Administrador',
  receptionist: 'Recepción',
  security: 'Seguridad',
  employee: 'Empleado',
}
