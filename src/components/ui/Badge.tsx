import type { ReactNode } from 'react'

type Tono = 'neutro' | 'exito' | 'advertencia' | 'peligro' | 'info'

const clasesPorTono: Record<Tono, string> = {
  neutro: 'bg-ink-100 text-ink-700',
  exito: 'bg-success-500/10 text-success-500',
  advertencia: 'bg-warning-500/10 text-warning-500',
  peligro: 'bg-danger-500/10 text-danger-500',
  info: 'bg-brand-100 text-brand-700',
}

export function Badge({ tono = 'neutro', children }: { tono?: Tono; children: ReactNode }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${clasesPorTono[tono]}`}>
      {children}
    </span>
  )
}
