import type { LucideIcon } from 'lucide-react'

interface IndicadorCardProps {
  etiqueta: string
  valor: number
  descripcion: string
  icon: LucideIcon
  variant?: 'default' | 'success' | 'warning' | 'danger'
}

const variants = {
  default: {
    icon: 'bg-brand-50 text-brand-600',
    value: 'text-ink-900',
  },
  success: {
    icon: 'bg-success-50 text-success-500',
    value: 'text-ink-900',
  },
  warning: {
    icon: 'bg-warning-50 text-warning-500',
    value: 'text-warning-700',
  },
  danger: {
    icon: 'bg-danger-50 text-danger-500',
    value: 'text-danger-700',
  },
}

export function IndicadorCard({
  etiqueta,
  valor,
  descripcion,
  icon: Icon,
  variant = 'default',
}: IndicadorCardProps) {
  const styles = variants[variant]

  return (
    <article className="rounded-2xl border border-ink-200/70 bg-white px-5 py-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-center gap-4">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${styles.icon}`}
        >
          <Icon size={20} strokeWidth={2} />
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-medium text-ink-500">
            {etiqueta}
          </p>

          <div className="mt-1 flex items-end justify-between gap-3">
            <p
              className={`text-2xl font-bold leading-none tracking-tight ${styles.value}`}
            >
              {valor}
            </p>

            <p className="truncate text-[11px] text-ink-400">
              {descripcion}
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}