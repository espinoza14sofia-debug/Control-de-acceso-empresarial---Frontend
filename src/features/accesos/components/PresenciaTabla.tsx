import {
  Clock3,
  DoorOpen,
  QrCode,
  UserRound,
} from 'lucide-react'

import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/feedback/EmptyState'
import { formatDuracion } from '@/utils/formatDuracion'

import type { AccessLog } from '../types/acceso.types'

interface Props {
  presencia: AccessLog[]
  onRegistrarSalida: (accessLogId: string) => void
  cargandoSalida?: boolean
}

export function PresenciaTabla({
  presencia,
  onRegistrarSalida,
  cargandoSalida = false,
}: Props) {
  if (presencia.length === 0) {
    return (
      <div className="rounded-xl bg-surface py-8">
        <EmptyState titulo="No hay personas que coincidan con la búsqueda" />
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-xl border border-ink-200">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse">
          <thead>
            <tr className="border-b border-ink-200 bg-surface">
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-ink-400">
                Persona
              </th>

              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-ink-400">
                Entrada
              </th>

              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-ink-400">
                Tipo
              </th>

              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-ink-400">
                Tiempo dentro
              </th>

              <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-ink-400">
                Acción
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-ink-200">
            {presencia.map((registro) => {
              const nombre =
                registro.visitors?.full_name ??
                'Visitante'

              const documento =
                registro.visitors?.document_id ??
                'Sin documento'

              const excedida =
                Boolean(
                  registro.permanencia_excedida,
                )

              return (
                <tr
                  key={registro.id}
                  className={[
                    'transition-colors hover:bg-surface/70',
                    excedida
                      ? 'bg-danger-50/40'
                      : 'bg-white',
                  ].join(' ')}
                >
                  {/* Persona */}
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={[
                          'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl',
                          excedida
                            ? 'bg-danger-50 text-danger-500'
                            : 'bg-brand-50 text-brand-600',
                        ].join(' ')}
                      >
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

                  {/* Hora de entrada */}
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2 text-sm text-ink-600">
                      <Clock3
                        size={15}
                        className="text-ink-400"
                      />

                      {new Date(
                        registro.entry_at,
                      ).toLocaleTimeString(
                        'es-CR',
                        {
                          hour: '2-digit',
                          minute: '2-digit',
                        },
                      )}
                    </div>
                  </td>

                  {/* Tipo */}
                  <td className="px-4 py-4">
                    <div className="inline-flex items-center gap-2 rounded-lg bg-surface px-2.5 py-1.5 text-xs font-medium text-ink-600">
                      {registro.entry_type ===
                      'qr' ? (
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

                      {registro.entry_type ===
                      'qr'
                        ? 'QR'
                        : 'Manual'}
                    </div>
                  </td>

                  {/* Tiempo */}
                  <td className="px-4 py-4">
                    <div>
                      <p
                        className={[
                          'text-sm font-semibold',
                          excedida
                            ? 'text-danger-700'
                            : 'text-ink-700',
                        ].join(' ')}
                      >
                        {formatDuracion(
                          registro.minutos_transcurridos ??
                            0,
                        )}
                      </p>

                      <p
                        className={[
                          'mt-0.5 text-xs',
                          excedida
                            ? 'font-medium text-danger-500'
                            : 'text-success-500',
                        ].join(' ')}
                      >
                        {excedida
                          ? 'Permanencia excedida'
                          : 'Dentro'}
                      </p>
                    </div>
                  </td>

                  {/* Salida */}
                  <td className="px-4 py-4 text-right">
                    <Button
                      variante="secundario"
                      cargando={cargandoSalida}
                      onClick={() =>
                        onRegistrarSalida(
                          registro.id,
                        )
                      }
                      className="!px-3 !py-2 text-xs"
                    >
                      Registrar salida
                    </Button>
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