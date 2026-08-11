export interface Departamento {
  id: string
  organization_id: string
  name: string
  description: string | null
  is_active: boolean
  created_at: string
}

/** Coincide con CrearDepartamentoDto. */
export interface CrearDepartamentoRequest {
  nombre: string
  descripcion?: string
}

/** Coincide con ActualizarDepartamentoDto. */
export type ActualizarDepartamentoRequest = Partial<CrearDepartamentoRequest>
