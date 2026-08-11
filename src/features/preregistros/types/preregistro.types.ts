export type EstadoPreregistro = 'pendiente' | 'ingresado' | 'cancelado'

export interface Preregistro {
  id: string
  organization_id: string
  visitor_id: string
  host_user_id: string | null
  scheduled_date: string
  scheduled_time: string | null
  reason: string | null
  status: EstadoPreregistro
  qr_token: string
  qr_expires_at: string
  created_at: string
  visitors: { full_name: string; document_id: string; visitor_type: string } | null
}

/** Coincide con CrearPreregistroDto. */
export interface CrearPreregistroRequest {
  visitanteId: string
  usuarioAnfitrionId?: string
  fechaProgramada: string
  horaProgramada?: string
  motivo?: string
}

export interface GenerarQrResponse {
  preregistroId: string
  qrToken: string
  qrExpiraEn: string
  qrImagen: string // data:image/png;base64,...
}

/** Coincide con ValidarIngresoDto. */
export interface ValidarIngresoRequest {
  preregistroId: string
  qrToken: string
}

export interface ValidarIngresoResponse {
  mensaje: string
  accessLog: { id: string }
}
