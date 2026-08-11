import { IndicadorCard } from './IndicadorCard'
import type { IndicadoresDelDia } from '../types/tablero.types'

export function IndicadoresGrid({ indicadores }: { indicadores: IndicadoresDelDia }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <IndicadorCard etiqueta="Visitas programadas hoy" valor={indicadores.visitasProgramadasHoy} />
      <IndicadorCard etiqueta="Visitas ingresadas hoy" valor={indicadores.visitasIngresadasHoy} />
      <IndicadorCard etiqueta="Visitas pendientes hoy" valor={indicadores.visitasPendientesHoy} />
      <IndicadorCard etiqueta="Visitas canceladas hoy" valor={indicadores.visitasCanceladasHoy} />
      <IndicadorCard etiqueta="Personas presentes ahora" valor={indicadores.personasPresentesAhora} />
      <IndicadorCard
        etiqueta="Con permanencia excedida"
        valor={indicadores.personasConPermanenciaExcedida}
        destacado={indicadores.personasConPermanenciaExcedida > 0}
      />
    </div>
  )
}
