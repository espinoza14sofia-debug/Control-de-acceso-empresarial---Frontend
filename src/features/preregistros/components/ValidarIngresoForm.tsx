import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import type { ValidarIngresoRequest } from '../types/preregistro.types'

interface Props {
  cargando?: boolean
  onEnviar: (datos: ValidarIngresoRequest) => void
}

/**
 * En un punto de control real, `preregistroId` y `qrToken` se obtienen
 * decodificando el QR escaneado (formato "<id>:<token>", ver backend).
 * Este formulario cubre tambien el caso de digitarlos manualmente.
 */
export function ValidarIngresoForm({ cargando, onEnviar }: Props) {
  const { register, handleSubmit } = useForm<ValidarIngresoRequest>()

  return (
    <form onSubmit={handleSubmit(onEnviar)} className="flex flex-col gap-4">
      <Input etiqueta="ID del pre-registro" {...register('preregistroId', { required: true })} />
      <Input etiqueta="Token del QR" {...register('qrToken', { required: true })} />
      <Button type="submit" cargando={cargando}>
        Validar ingreso
      </Button>
    </form>
  )
}
