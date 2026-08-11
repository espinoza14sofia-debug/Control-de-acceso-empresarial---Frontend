import { forwardRef, type SelectHTMLAttributes } from 'react'

interface OpcionSelect {
  value: string
  label: string
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  etiqueta?: string
  opciones: OpcionSelect[]
  placeholder?: string
  error?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { etiqueta, opciones, placeholder, error, id, className = '', ...props },
  ref,
) {
  return (
    <div className="flex flex-col gap-1">
      {etiqueta && (
        <label htmlFor={id} className="text-sm font-medium text-ink-700">
          {etiqueta}
        </label>
      )}
      <select
        ref={ref}
        id={id}
        className={`rounded-md border bg-white px-3 py-2 text-sm text-ink-900 outline-none focus:ring-2 focus:ring-brand-500 ${
          error ? 'border-danger-500' : 'border-ink-300'
        } ${className}`}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {opciones.map((opcion) => (
          <option key={opcion.value} value={opcion.value}>
            {opcion.label}
          </option>
        ))}
      </select>
      {error && <span className="text-xs text-danger-500">{error}</span>}
    </div>
  )
})
