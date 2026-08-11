export type TipoVisitante = 'personal' | 'proveedor' | 'contratista'

export interface Visitante {
  id: string
  organization_id: string
  full_name: string
  document_id: string
  phone: string | null
  visitor_type: TipoVisitante
  provider_company: string | null
  is_active: boolean
  created_at: string
}

/** Coincide con CrearVisitanteDto. */
export interface CrearVisitanteRequest {
  nombreCompleto: string
  documentoIdentidad: string
  telefono?: string
  tipoVisitante: TipoVisitante
  empresaProveedora?: string
}

export type ActualizarVisitanteRequest = Partial<CrearVisitanteRequest>

/** Fila de /visitantes/:id/historial (preregistrations + join a users). */
export interface VisitaHistorial {
  id: string
  scheduled_date: string
  scheduled_time: string | null
  reason: string | null
  status: 'pendiente' | 'ingresado' | 'cancelado'
  users: { full_name: string } | null
}
