/** Coincide exactamente con la respuesta de GET /tablero/indicadores. */
export interface IndicadoresDelDia {
  fecha: string
  visitasProgramadasHoy: number
  visitasIngresadasHoy: number
  visitasCanceladasHoy: number
  visitasPendientesHoy: number
  personasPresentesAhora: number
  personasConPermanenciaExcedida: number
}
