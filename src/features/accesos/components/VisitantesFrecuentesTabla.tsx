import {
  Hash,
  UserRound,
} from 'lucide-react'

import { EmptyState } from '@/components/feedback/EmptyState'

import type { VisitanteFrecuente } from '../types/acceso.types'

export function VisitantesFrecuentesTabla({
  datos,
}: {
  datos: VisitanteFrecuente[]
}) {
  if (datos.length === 0) {
    return (
      <div className="rounded-xl bg-surface py-10">
        <EmptyState titulo="Aún no hay suficientes datos de visitas" />
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-xl border border-ink-200">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[650px] border-collapse">
          <thead>
            <tr className="border-b border-ink-200 bg-surface">
              <th className="w-20 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-ink-400">
                Posición
              </th>

              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-ink-400">
                Visitante
              </th>

              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-ink-400">
                Documento
              </th>

              <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-ink-400">
                Visitas
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-ink-200">
            {datos.map((visitante, index) => (
              <tr
                key={visitante.visitorId}
                className="bg-white transition-colors hover:bg-surface/70"
              >
                <td className="px-4 py-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-sm font-bold text-brand-600">
                    {index + 1}
                  </div>
                </td>

                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                      <UserRound size={18} />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-ink-900">
                        {visitante.visitante?.full_name ??
                          'Visitante'}
                      </p>

                      <p className="mt-0.5 text-xs text-ink-400">
                        {visitante.visitante?.visitor_type ??
                          'Sin tipo'}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-4 py-4">
                  <div className="flex items-center gap-2 text-sm text-ink-600">
                    <Hash
                      size={14}
                      className="text-ink-400"
                    />

                    {visitante.visitante?.document_id ??
                      '—'}
                  </div>
                </td>

                <td className="px-4 py-4 text-right">
                  <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1.5">
                    <span className="text-sm font-bold text-brand-700">
                      {visitante.visitas}
                    </span>

                    <span className="text-xs text-brand-600">
                      {visitante.visitas === 1
                        ? 'visita'
                        : 'visitas'}
                    </span>
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
