import { useState } from 'react'
import { useNotificaciones } from '../hooks/useNotificaciones'
import { useMarcarLeida } from '../hooks/useMarcarLeida'
import { useMarcarTodasLeidas } from '../hooks/useMarcarTodasLeidas'
import { NotificacionItem } from './NotificacionItem'
import { EmptyState } from '@/components/feedback/EmptyState'

export function NotificacionesDropdown() {
  const [abierto, setAbierto] = useState(false)
  const { data: notificaciones = [] } = useNotificaciones()
  const marcarLeida = useMarcarLeida()
  const marcarTodasLeidas = useMarcarTodasLeidas()

  const noLeidas = notificaciones.filter((n) => !n.is_read).length

  return (
    <div className="relative">
      <button
        onClick={() => setAbierto((v) => !v)}
        aria-label="Notificaciones"
        className="relative rounded-full p-2 hover:bg-surface"
      >
        🔔
        {noLeidas > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-danger-500 text-[10px] text-white">
            {noLeidas}
          </span>
        )}
      </button>

      {abierto && (
        <div className="absolute right-0 z-40 mt-2 w-80 rounded-lg border border-ink-300/50 bg-white shadow-lg">
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
