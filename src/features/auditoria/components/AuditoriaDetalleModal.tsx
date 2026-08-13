import { Modal } from '@/components/ui/Modal'
import type { EventoAuditoria } from '../types/auditoria.types'

interface Props {
    evento: EventoAuditoria | null
    onCerrar: () => void
}

export function AuditoriaDetalleModal({ evento, onCerrar }: Props) {
    return (
        <Modal abierto={!!evento} titulo="Detalle del evento" onCerrar={onCerrar}>
            {evento && (
                <dl className="flex flex-col gap-3 text-sm">
                    <Campo etiqueta="Fecha">{new Date(evento.created_at).toLocaleString('es-CR')}</Campo>
                    <Campo etiqueta="Usuario">
                        {evento.users ? `${evento.users.full_name} (${evento.users.email})` : 'Sistema'}
                    </Campo>
                    <Campo etiqueta="Accion">{evento.action}</Campo>
                    <Campo etiqueta="Entidad">
                        {evento.entity_type ? `${evento.entity_type}${evento.entity_id ? ` #${evento.entity_id}` : ''}` : '—'}
                    </Campo>
                    <Campo etiqueta="Direccion IP">{evento.ip_address ?? '—'}</Campo>

                    <div>
                        <dt className="mb-1 font-medium text-ink-700">Detalles</dt>
                        <dd>
                            {evento.details ? (
                                <pre className="max-h-64 overflow-auto rounded-md bg-surface p-3 text-xs text-ink-700">
                                    {JSON.stringify(evento.details, null, 2)}
                                </pre>
                            ) : (
                                <span className="text-ink-400">Sin detalles adicionales.</span>
                            )}
                        </dd>
                    </div>
                </dl>
            )}
        </Modal>
    )
}

function Campo({ etiqueta, children }: { etiqueta: string; children: React.ReactNode }) {
    return (
        <div className="flex justify-between gap-4">
            <dt className="text-ink-500">{etiqueta}</dt>
            <dd className="text-right font-medium text-ink-900">{children}</dd>
        </div>
    )
}