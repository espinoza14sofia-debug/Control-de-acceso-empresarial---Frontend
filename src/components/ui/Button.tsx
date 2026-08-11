import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variante = 'primario' | 'secundario' | 'peligro' | 'fantasma'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variante?: Variante
  cargando?: boolean
  children: ReactNode
}

const clasesPorVariante: Record<Variante, string> = {
  primario: 'bg-brand-600 text-white hover:bg-brand-700 focus-visible:outline-brand-600',
  secundario: 'bg-white text-ink-900 border border-ink-300 hover:bg-surface focus-visible:outline-ink-500',
  peligro: 'bg-danger-500 text-white hover:opacity-90 focus-visible:outline-danger-500',
  fantasma: 'bg-transparent text-ink-700 hover:bg-surface focus-visible:outline-ink-500',
}

export function Button({ variante = 'primario', cargando, children, className = '', disabled, ...props }: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${clasesPorVariante[variante]} ${className}`}
      disabled={disabled || cargando}
      {...props}
    >
      {cargando ? 'Procesando…' : children}
    </button>
  )
}
