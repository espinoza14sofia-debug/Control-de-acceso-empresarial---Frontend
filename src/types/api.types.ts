/**
 * Tipos genericos compartidos por todos los servicios de API.
 */

export interface ApiErrorBody {
  statusCode: number
  message: string | string[]
  error?: string
}

export class ApiError extends Error {
  statusCode: number
  details: string[]

  constructor(body: ApiErrorBody) {
    const mensaje = Array.isArray(body.message) ? body.message.join(', ') : body.message
    super(mensaje)
    this.statusCode = body.statusCode
    this.details = Array.isArray(body.message) ? body.message : [body.message]
  }
}
