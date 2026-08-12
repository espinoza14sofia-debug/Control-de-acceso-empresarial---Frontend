import {
  Building2,
  FileClock,
  Hash,
  Pencil,
  UserRound,
} from 'lucide-react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/feedback/EmptyState'
import { TipoVisitanteBadge } from './TipoVisitanteBadge'

import { RUTAS } from '@/constants/rutas'

import type { Visitante } from '../types/visitante.types'

interface Props {
  visitantes: Visitante[]
  onEditar: (visitante: Visitante) => void
}

export function VisitantesTabla({
  visitantes,
  onEditar,
}: Props) {
  if (visitantes.length === 0) {
    return (
      <div className="rounded-xl bg-surface py-10">
        <EmptyState titulo="No hay visitantes que coincidan con la búsqueda" />
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-xl border border-ink-200">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] border-collapse">
          <thead>
            <tr className="border-b border-ink-200 bg-surface">
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-ink-400">
                Visitante
              </th>

              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-ink-400">
                Documento
              </th>

              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-ink-400">
                Tipo
              </th>

              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-ink-400">
                Empresa
              </th>

              <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-ink-400">
                Acciones
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-ink-200">
            {visitantes.map((visitante) => (
              <tr
                key={visitante.id}
                className="bg-white transition-colors hover:bg-surface/70"
              >
                {/* Persona */}
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                      <UserRound size={18} />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-ink-900">
                        {visitante.full_name}
                      </p>

                      <p className="mt-0.5 text-xs text-ink-400">
                        {visitante.phone ??
                          'Sin teléfono'}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Documento */}
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2 text-sm text-ink-600">
                    <Hash
                      size={14}
                      className="text-ink-400"
                    />

                    {visitante.document_id}
                  </div>
                </td>

                {/* Tipo */}
                <td className="px-4 py-4">
                  <TipoVisitanteBadge
                    tipo={visitante.visitor_type}
                  />
                </td>

                {/* Empresa */}
                <td className="px-4 py-4">
                  {visitante.provider_company ? (
                    <div className="flex items-center gap-2 text-sm text-ink-600">
                      <Building2
                        size={15}
                        className="text-ink-400"
                      />

                      {visitante.provider_company}
                    </div>
                  ) : (
                    <span className="text-sm text-ink-400">
                      —
                    </span>
                  )}
                </td>

                {/* Acciones */}
                <td className="px-4 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variante="secundario"
                      onClick={() =>
                        onEditar(visitante)
                      }
                      className="!px-3 !py-2 text-xs"
                    >
                      <span className="inline-flex items-center gap-2">
                        <Pencil size={14} />
                        Editar
                      </span>
                    </Button>

                    <Link
                      to={RUTAS.VISITANTE_HISTORIAL(
                        visitante.id,
                      )}
                      className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-brand-600 transition hover:bg-brand-50"
                    >
                      <FileClock size={14} />
                      Historial
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
