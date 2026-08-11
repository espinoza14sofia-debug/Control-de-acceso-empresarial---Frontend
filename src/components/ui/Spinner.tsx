export function Spinner({ tamano = 24 }: { tamano?: number }) {
  return (
    <span
      role="status"
      aria-label="Cargando"
      className="inline-block animate-spin rounded-full border-2 border-ink-300 border-t-brand-600"
      style={{ width: tamano, height: tamano }}
    />
  )
}
