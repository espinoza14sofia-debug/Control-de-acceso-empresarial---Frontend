import type { ReactNode } from 'react'

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-lg border border-ink-300/50 bg-white p-5 shadow-sm ${className}`}>
      {children}
    </div>
  )
}
