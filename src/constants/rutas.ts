/**
 * Rutas centralizadas de la aplicacion. Evita strings sueltos repetidos
 * en links, redirects y configuracion de <Route>.
 */
export const RUTAS = {
  LOGIN: '/login',
  RECUPERAR_PASSWORD: '/recuperar-password',
  RESTABLECER_PASSWORD: '/restablecer-password',

  DASHBOARD: '/app/dashboard',
  PERFIL: '/app/perfil',

  USUARIOS: '/app/usuarios',
  USUARIO_NUEVO: '/app/usuarios/nuevo',
  USUARIO_DETALLE: (id: string) => `/app/usuarios/${id}`,
  USUARIO_EDITAR: (id: string) => `/app/usuarios/${id}/editar`,

  DEPARTAMENTOS: '/app/departamentos',

  VISITANTES: '/app/visitantes',
  VISITANTE_HISTORIAL: (id: string) => `/app/visitantes/${id}/historial`,

  VISITAS_HOY: '/app/visitas-hoy',
  PREREGISTRO_NUEVO: '/app/preregistros/nuevo',
  PREREGISTRO_QR: (id: string) => `/app/preregistros/${id}/qr`,

  CONTROL_INGRESO: '/app/control-ingreso',
  PRESENCIA: '/app/presencia',
  HISTORIAL_ACCESOS: '/app/historial-accesos',
  VISITANTES_FRECUENTES: '/app/visitantes-frecuentes',
  REPORTES: '/app/reportes',

  AUDITORIA: '/app/auditoria',
} as const
