import type { ReactNode } from 'react'

export function EmptyState({
  titulo,
  descripcion,
  accion,
}: {
  titulo: string
  descripcion?: string
  accion?: ReactNode
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-ink-300 py-16 text-center">
      <p className="text-sm font-medium text-ink-700">{titulo}</p>
      {descripcion && <p className="text-sm text-ink-500">{descripcion}</p>}
      {accion}
    </div>
  )
}
