// src/features/accesos/components/HistorialTabla.tsx

import {
  Clock3,
  DoorClosed,
  DoorOpen,
  QrCode,
  UserRound,
} from 'lucide-react'

import { EmptyState } from '@/components/feedback/EmptyState'

import type { AccessLog } from '../types/acceso.types'

export function HistorialTabla({
  registros,
}: {
  registros: AccessLog[]
}) {
  if (registros.length === 0) {
    return (
      <div className="rounded-xl bg-surface py-10">
        <EmptyState titulo="No hay registros para los filtros seleccionados" />
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-xl border border-ink-200">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[850px] border-collapse">
          <thead>
            <tr className="border-b border-ink-200 bg-surface">
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-ink-400">
                Persona
              </th>

              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-ink-400">
                Tipo
              </th>

              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-ink-400">
                Entrada
              </th>

              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-ink-400">
                Salida
              </th>

              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-ink-400">
                Estado
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-ink-200">
            {registros.map((registro) => {
              const dentro =
                registro.exit_at === null

              const nombre =
                registro.visitors?.full_name ??
                'Visitante'

              const documento =
                registro.visitors?.document_id ??
                'Sin documento'

              return (
                <tr
                  key={registro.id}
                  className="bg-white transition-colors hover:bg-surface/70"
                >
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                        <UserRound size={18} />
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-ink-900">
                          {nombre}
                        </p>

                        <p className="mt-0.5 text-xs text-ink-400">
                          {documento}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-4">
                    <div className="inline-flex items-center gap-2 rounded-lg bg-surface px-2.5 py-1.5 text-xs font-medium text-ink-600">
                      {registro.entry_type === 'qr' ? (
                        <QrCode
                          size={14}
                          className="text-brand-600"
                        />
                      ) : (
                        <DoorOpen
                          size={14}
                          className="text-brand-600"
                        />
                      )}

                      {registro.entry_type === 'qr'
                        ? 'QR'
                        : 'Manual'}
                    </div>
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2 text-sm text-ink-600">
                      <DoorOpen
                        size={15}
                        className="text-success-500"
                      />

                      <div>
                        <p>
                          {formatearFecha(
                            registro.entry_at,
                          )}
                        </p>

                        <p className="mt-0.5 text-xs text-ink-400">
                          {formatearHora(
                            registro.entry_at,
                          )}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-4">
                    {registro.exit_at ? (
                      <div className="flex items-center gap-2 text-sm text-ink-600">
                        <DoorClosed
                          size={15}
                          className="text-ink-400"
                        />

                        <div>
                          <p>
                            {formatearFecha(
                              registro.exit_at,
                            )}
                          </p>

                          <p className="mt-0.5 text-xs text-ink-400">
                            {formatearHora(
                              registro.exit_at,
                            )}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <span className="text-sm text-ink-400">
                        —
                      </span>
                    )}
                  </td>

                  <td className="px-4 py-4">
                    <div
                      className={[
                        'inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold',
                        dentro
                          ? 'bg-success-50 text-success-700'
                          : 'bg-surface text-ink-500',
                      ].join(' ')}
                    >
                      {dentro ? (
                        <>
                          <span className="h-2 w-2 rounded-full bg-success-500" />
                          Dentro
                        </>
                      ) : (
                        <>
                          <Clock3 size={13} />
                          Finalizado
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function formatearFecha(fecha: string) {
  return new Date(fecha).toLocaleDateString(
    'es-CR',
    {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    },
  )
}

function formatearHora(fecha: string) {
  return new Date(fecha).toLocaleTimeString(
    'es-CR',
    {
      hour: '2-digit',
      minute: '2-digit',
    },
  )
}