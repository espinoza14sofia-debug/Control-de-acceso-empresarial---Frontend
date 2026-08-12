import {
  CheckCircle2,
  Clock3,
  XCircle,
} from 'lucide-react'

import type { EstadoPreregistro } from '../types/preregistro.types'

export function EstadoPreregistroBadge({
  estado,
}: {
  estado: EstadoPreregistro
}) {
  const configuracion = {
    pendiente: {
      etiqueta: 'Pendiente',
      clase:
        'bg-warning-50 text-warning-700',
      icono: <Clock3 size={13} />,
    },

    ingresado: {
      etiqueta: 'Ingresado',
      clase:
        'bg-success-50 text-success-700',
      icono: <CheckCircle2 size={13} />,
    },

    cancelado: {
      etiqueta: 'Cancelado',
      clase:
        'bg-danger-50 text-danger-700',
      icono: <XCircle size={13} />,
    },
  }

  const config =
    configuracion[estado]

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${config.clase}`}
    >
      {config.icono}
      {config.etiqueta}
    </span>
  )
}