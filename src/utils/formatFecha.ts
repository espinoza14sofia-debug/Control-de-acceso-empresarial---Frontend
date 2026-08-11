export function formatFecha(fechaISO: string): string {
  return new Date(fechaISO).toLocaleDateString('es-CR')
}

export function formatFechaHora(fechaISO: string): string {
  return new Date(fechaISO).toLocaleString('es-CR')
}
