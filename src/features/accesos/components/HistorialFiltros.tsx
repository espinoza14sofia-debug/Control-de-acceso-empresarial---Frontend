// src/features/accesos/components/HistorialFiltros.tsx

import {
  CalendarRange,
  RotateCcw,
} from 'lucide-react'

import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'

import type { FiltrosHistorial } from '../types/acceso.types'

interface Props {
  filtros: FiltrosHistorial
  onCambiar: (filtros: FiltrosHistorial) => void
}

/**
 * Corresponde a los query params reales de GET /accesos/historial.
 */
export function HistorialFiltros({
  filtros,
  onCambiar,
}: Props) {
  const hayFiltros =
    Boolean(filtros.fechaInicio) ||
    Boolean(filtros.fechaFin) ||
    Boolean(filtros.tipoEntrada)

  function limpiarFiltros() {
    onCambiar({})
  }

  return (
    <div className="rounded-xl bg-surface p-4">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <CalendarRange
            size={17}
            className="text-brand-600"
          />

          <p className="text-sm font-semibold text-ink-700">
            Filtros
          </p>
        </div>

        {hayFiltros && (
          <button
            type="button"
            onClick={limpiarFiltros}
            className="inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium text-ink-500 transition hover:bg-white hover:text-brand-600"
          >
            <RotateCcw size={14} />
            Limpiar
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <Input
          etiqueta="Desde"
          type="date"
          value={filtros.fechaInicio ?? ''}
          onChange={(event) =>
            onCambiar({
              ...filtros,
              fechaInicio:
                event.target.value || undefined,
            })
          }
        />

        <Input
          etiqueta="Hasta"
          type="date"
          value={filtros.fechaFin ?? ''}
          onChange={(event) =>
            onCambiar({
              ...filtros,
              fechaFin:
                event.target.value || undefined,
            })
          }
        />

        <Select
          etiqueta="Tipo de entrada"
          placeholder="Todos"
          opciones={[
            {
              value: 'qr',
              label: 'Código QR',
            },
            {
              value: 'manual',
              label: 'Entrada manual',
            },
          ]}
          value={filtros.tipoEntrada ?? ''}
          onChange={(event) =>
            onCambiar({
              ...filtros,
              tipoEntrada:
                (event.target.value ||
                  undefined) as FiltrosHistorial['tipoEntrada'],
            })
          }
        />
      </div>
    </div>
  )
}
