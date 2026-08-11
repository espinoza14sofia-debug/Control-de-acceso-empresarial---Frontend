export interface EventoAuditoria {
  id: string
  organization_id: string
  user_id: string | null
  action: string
  entity_type: string | null
  entity_id: string | null
  details: Record<string, unknown> | null
  ip_address: string | null
  created_at: string
  users: { full_name: string; email: string } | null
}

export interface FiltrosAuditoria {
  usuarioId?: string
  accion?: string
  tipoEntidad?: string
  fechaInicio?: string
  fechaFin?: string
  limite?: number
}
