export type TipoEntrada = 'qr' | 'manual'

export interface AccessLog {
  id: string
  organization_id: string
  preregistration_id: string | null
  visitor_id: string
  entry_type: TipoEntrada
  entry_at: string
  exit_at: string | null
  registered_by: string
  created_at: string
  visitors: { full_name: string; document_id: string; visitor_type: string } | null
  minutos_transcurridos?: number
  permanencia_excedida?: boolean
}

export interface FiltrosHistorial {
  visitanteId?: string
  fechaInicio?: string
  fechaFin?: string
  tipoEntrada?: TipoEntrada
}

/** Coincide con RegistrarEntradaManualDto. */
export interface EntradaManualRequest {
  visitanteId: string
}

/** Coincide con RegistrarSalidaDto. */
export interface RegistrarSalidaRequest {
  accessLogId: string
}

export interface VisitanteFrecuente {
  visitorId: string
  visitante: { full_name: string; document_id: string; visitor_type: string } | null
  visitas: number
}
