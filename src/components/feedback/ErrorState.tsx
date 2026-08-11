export function ErrorState({
  mensaje = 'Ocurrio un error al cargar la informacion.',
  onReintentar,
}: {
  mensaje?: string
  onReintentar?: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-danger-500/30 bg-danger-500/5 py-16 text-center">
      <p className="text-sm font-medium text-danger-500">{mensaje}</p>
      {onReintentar && (
        <button onClick={onReintentar} className="text-sm font-medium text-brand-600 hover:underline">
          Reintentar
        </button>
      )}
    </div>
  )
}
