import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { QrCode, Keyboard } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { QrScanner } from './QrScanner'
import type { ValidarIngresoRequest } from '../types/preregistro.types'

interface Props {
    cargando?: boolean
    onEnviar: (datos: ValidarIngresoRequest) => void
}

/**
 * En un punto de control real, `preregistroId` y `qrToken` se obtienen
 * decodificando el QR escaneado (formato "<id>:<token>", ver backend).
 * Este formulario cubre ambos casos: escaneo real por camara, o
 * digitarlos manualmente si la camara no esta disponible.
 */
export function ValidarIngresoForm({ cargando, onEnviar }: Props) {
    const [modo, setModo] = useState<'escanear' | 'manual'>('escanear')
    const { register, handleSubmit, setValue } = useForm<ValidarIngresoRequest>()

    const manejarQrDetectado = (texto: string) => {
        const [preregistroId, qrToken] = texto.split(':')
        if (!preregistroId || !qrToken) {
            setModo('manual')
            return
        }
        setValue('preregistroId', preregistroId)
        setValue('qrToken', qrToken)
        onEnviar({ preregistroId, qrToken })
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex gap-2 rounded-lg bg-surface p-1">
                <button
                    type="button"
                    onClick={() => setModo('escanear')}
                    className={`flex flex-1 items-center justify-center gap-1.5 rounded-md py-1.5 text-sm font-medium transition ${modo === 'escanear' ? 'bg-white text-ink-900 shadow-sm' : 'text-ink-500'
                        }`}
                >
                    <QrCode size={15} />
                    Escanear
                </button>
                <button
                    type="button"
                    onClick={() => setModo('manual')}
                    className={`flex flex-1 items-center justify-center gap-1.5 rounded-md py-1.5 text-sm font-medium transition ${modo === 'manual' ? 'bg-white text-ink-900 shadow-sm' : 'text-ink-500'
                        }`}
                >
                    <Keyboard size={15} />
                    Manual
                </button>
            </div>

            {modo === 'escanear' ? (
                <QrScanner activo={modo === 'escanear'} onDetectado={manejarQrDetectado} />
            ) : (
                <form onSubmit={handleSubmit(onEnviar)} className="flex flex-col gap-4">
                    <Input etiqueta="ID del pre-registro" {...register('preregistroId', { required: true })} />
                    <Input etiqueta="Token del QR" {...register('qrToken', { required: true })} />
                    <Button type="submit" cargando={cargando}>
                        Validar ingreso
                    </Button>
                </form>
            )}
        </div>
    )
}