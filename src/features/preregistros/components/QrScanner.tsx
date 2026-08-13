import { useCallback, useEffect, useRef, useState } from 'react'
import jsQR from 'jsqr'
import { AlertCircle, Camera } from 'lucide-react'

interface Props {
    activo: boolean
    onDetectado: (texto: string) => void
}

/**
 * Escanea QR con la camara del dispositivo. Captura frames de <video>
 * a un <canvas> oculto y los decodifica con jsQR (no requiere backend
 * ni permisos especiales mas alla de getUserMedia).
 */
export function QrScanner({ activo, onDetectado }: Props) {
    const videoRef = useRef<HTMLVideoElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const streamRef = useRef<MediaStream | null>(null)
    const frameIdRef = useRef<number>(0)
    const yaDetectadoRef = useRef(false)

    const [error, setError] = useState<string | null>(null)

    const detenerCamara = useCallback(() => {
        cancelAnimationFrame(frameIdRef.current)
        streamRef.current?.getTracks().forEach((track) => track.stop())
        streamRef.current = null
    }, [])

    const escanearFrame = useCallback(() => {
        const video = videoRef.current
        const canvas = canvasRef.current
        if (!video || !canvas || video.readyState !== video.HAVE_ENOUGH_DATA) {
            frameIdRef.current = requestAnimationFrame(escanearFrame)
            return
        }

        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        const contexto = canvas.getContext('2d')
        if (!contexto) return

        contexto.drawImage(video, 0, 0, canvas.width, canvas.height)
        const imagen = contexto.getImageData(0, 0, canvas.width, canvas.height)
        const resultado = jsQR(imagen.data, imagen.width, imagen.height)

        if (resultado && !yaDetectadoRef.current) {
            yaDetectadoRef.current = true
            onDetectado(resultado.data)
            return
        }

        frameIdRef.current = requestAnimationFrame(escanearFrame)
    }, [onDetectado])

    useEffect(() => {
        if (!activo) {
            detenerCamara()
            return
        }

        yaDetectadoRef.current = false
        setError(null)

        navigator.mediaDevices
            .getUserMedia({ video: { facingMode: 'environment' } })
            .then((stream) => {
                streamRef.current = stream
                if (videoRef.current) {
                    videoRef.current.srcObject = stream
                    void videoRef.current.play()
                }
                frameIdRef.current = requestAnimationFrame(escanearFrame)
            })
            .catch(() => {
                setError('No se pudo acceder a la camara. Revisa los permisos del navegador.')
            })

        return detenerCamara
    }, [activo, detenerCamara, escanearFrame])

    if (!activo) return null

    if (error) {
        return (
            <div className="flex flex-col items-center gap-2 rounded-lg border border-danger-500/30 bg-danger-50 p-6 text-center text-sm text-danger-700">
                <AlertCircle size={20} />
                {error}
            </div>
        )
    }

    return (
        <div className="relative overflow-hidden rounded-lg border border-ink-300/50 bg-black">
            <video ref={videoRef} muted playsInline className="aspect-square w-full object-cover" />
            <canvas ref={canvasRef} className="hidden" />

            <div className="pointer-events-none absolute inset-8 rounded-lg border-2 border-white/70" />

            <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-black/60 px-3 py-1 text-xs text-white">
                <Camera size={13} />
                Apunta la camara al codigo QR
            </div>
        </div>
    )
}