import { useState } from 'react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { useDescargarReporteExcel } from '../hooks/useDescargarReporteExcel'
import { useDescargarReportePdf } from '../hooks/useDescargarReportePdf'

export function DescargarReporteBotones() {
  const [fechaInicio, setFechaInicio] = useState('')
  const [fechaFin, setFechaFin] = useState('')
  const excel = useDescargarReporteExcel()
  const pdf = useDescargarReportePdf()

  return (
    <Card className="max-w-md">
      <div className="mb-4 grid grid-cols-2 gap-3">
        <Input etiqueta="Desde" type="date" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} />
        <Input etiqueta="Hasta" type="date" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} />
      </div>
      <div className="flex gap-3">
        <Button
          variante="secundario"
          cargando={excel.isPending}
          onClick={() => excel.mutate({ fechaInicio: fechaInicio || undefined, fechaFin: fechaFin || undefined })}
        >
          Descargar Excel
        </Button>
        <Button
          variante="secundario"
          cargando={pdf.isPending}
          onClick={() => pdf.mutate({ fechaInicio: fechaInicio || undefined, fechaFin: fechaFin || undefined })}
        >
          Descargar PDF
        </Button>
      </div>
    </Card>
  )
}
