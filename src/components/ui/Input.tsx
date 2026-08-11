import { forwardRef, type InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  etiqueta?: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { etiqueta, error, id, className = '', ...props },
  ref,
) {
  return (
    <div className="flex flex-col gap-1">
      {etiqueta && (
        <label htmlFor={id} className="text-sm font-medium text-ink-700">
          {etiqueta}
        </label>
      )}
      <input
        ref={ref}
        id={id}
        className={`rounded-md border px-3 py-2 text-sm text-ink-900 outline-none focus:ring-2 focus:ring-brand-500 ${
          error ? 'border-danger-500' : 'border-ink-300'
        } ${className}`}
        {...props}
      />
      {error && <span className="text-xs text-danger-500">{error}</span>}
    </div>
  )
})
