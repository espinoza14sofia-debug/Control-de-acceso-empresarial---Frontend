import type { GenerarQrResponse } from '../types/preregistro.types'

export function QrDisplay({ qr }: { qr: GenerarQrResponse }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-lg border border-ink-300/50 bg-white p-6">
      <img src={qr.qrImagen} alt="Codigo QR de la visita" className="h-56 w-56" />
      <p className="text-xs text-ink-500">Valido hasta: {new Date(qr.qrExpiraEn).toLocaleString('es-CR')}</p>
    </div>
  )
}
