import type { Notificacion } from '../types/notificacion.types'

export function NotificacionItem({
  notificacion,
  onMarcarLeida,
}: {
  notificacion: Notificacion
  onMarcarLeida: (id: string) => void
}) {
  return (
    <button
      onClick={() => !notificacion.is_read && onMarcarLeida(notificacion.id)}
      className={`w-full border-b border-ink-300/30 px-4 py-3 text-left last:border-0 hover:bg-surface ${
        notificacion.is_read ? 'opacity-60' : ''
      }`}
    >
      <p className="text-sm font-medium text-ink-900">{notificacion.title}</p>
      <p className="text-sm text-ink-500">{notificacion.message}</p>
      <p className="mt-1 text-xs text-ink-300">{new Date(notificacion.created_at).toLocaleString('es-CR')}</p>
    </button>
  )
}
