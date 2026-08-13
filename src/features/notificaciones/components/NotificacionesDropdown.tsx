import { useRef, useState } from 'react'
import { Bell } from 'lucide-react'
import { useNotificaciones } from '../hooks/useNotificaciones'
import { useMarcarLeida } from '../hooks/useMarcarLeida'
import { useMarcarTodasLeidas } from '../hooks/useMarcarTodasLeidas'
import { useClickOutside } from '@/hooks/useClickOutside'
import { NotificacionItem } from './NotificacionItem'
import { EmptyState } from '@/components/feedback/EmptyState'

export function NotificacionesDropdown() {
    const [abierto, setAbierto] = useState(false)
    const contenedorRef = useRef<HTMLDivElement>(null)
    const { data: notificaciones = [] } = useNotificaciones()
    const marcarLeida = useMarcarLeida()
    const marcarTodasLeidas = useMarcarTodasLeidas()

    useClickOutside(contenedorRef, () => setAbierto(false), abierto)

    const noLeidas = notificaciones.filter((n) => !n.is_read).length

    return (
        <div ref={contenedorRef} className="relative">
            <button
                onClick={() => setAbierto((v) => !v)}
                aria-label="Notificaciones"
                aria-haspopup="menu"
                aria-expanded={abierto}
                className="relative rounded-full p-2 text-ink-500 hover:bg-surface hover:text-ink-900"
            >
                <Bell size={19} />
                {noLeidas > 0 && (
                    <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-danger-500 text-[10px] text-white">
                        {noLeidas}
                    </span>
                )}
            </button>

            {abierto && (
                <div
                    role="menu"
                    className="absolute right-0 z-40 mt-2 w-80 max-w-[calc(100vw-2rem)] rounded-lg border border-ink-300/50 bg-white shadow-lg"
                >
                    <div className="flex items-center justify-between border-b border-ink-300/30 px-4 py-2">
                        <span className="text-sm font-semibold">Notificaciones</span>
                        {noLeidas > 0 && (
                            <button
                                onClick={() => marcarTodasLeidas.mutate()}
                                className="text-xs font-medium text-brand-600 hover:underline"
                            >
                                Marcar todas leidas
                            </button>
                        )}
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                        {notificaciones.length === 0 ? (
                            <EmptyState titulo="Sin notificaciones" descripcion="Aqui apareceran las llegadas de tus visitas." />
                        ) : (
                            notificaciones.map((n) => (
                                <NotificacionItem key={n.id} notificacion={n} onMarcarLeida={(id) => marcarLeida.mutate(id)} />
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}