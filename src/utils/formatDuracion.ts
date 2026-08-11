/** Convierte minutos_transcurridos (de /accesos/presencia) a formato legible "1h 20min". */
export function formatDuracion(minutos: number): string {
  const horas = Math.floor(minutos / 60)
  const min = minutos % 60
  if (horas === 0) return `${min}min`
  return `${horas}h ${min}min`
}
