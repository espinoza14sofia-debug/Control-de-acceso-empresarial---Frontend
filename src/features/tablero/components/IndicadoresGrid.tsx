import {
  AlertTriangle,
  CalendarDays,
  DoorOpen,
  Users,
} from 'lucide-react'

import type { IndicadoresDelDia } from '../types/tablero.types'
import { IndicadorCard } from './IndicadorCard'

export function IndicadoresGrid({
  indicadores,
}: {
  indicadores: IndicadoresDelDia
}) {
  const situacionesAtencion =
    indicadores.visitasPendientesHoy +
    indicadores.personasConPermanenciaExcedida

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <IndicadorCard
        etiqueta="Personas dentro"
        valor={indicadores.personasPresentesAhora}
        descripcion="Ahora"
        icon={Users}
        variant="success"
      />

      <IndicadorCard
        etiqueta="Ingresos de hoy"
        valor={indicadores.visitasIngresadasHoy}
        descripcion="Hoy"
        icon={DoorOpen}
        variant="success"
      />

      <IndicadorCard
        etiqueta="Visitas programadas"
        valor={indicadores.visitasProgramadasHoy}
        descripcion="Hoy"
        icon={CalendarDays}
      />

      <IndicadorCard
        etiqueta="Requieren atención"
        valor={situacionesAtencion}
        descripcion={
          situacionesAtencion > 0
            ? 'Por revisar'
            : 'Todo en orden'
        }
        icon={AlertTriangle}
        variant={
          situacionesAtencion > 0
            ? 'warning'
            : 'default'
        }
      />
    </div>
  )
}