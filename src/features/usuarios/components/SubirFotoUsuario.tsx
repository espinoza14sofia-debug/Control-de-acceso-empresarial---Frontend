import { useRef } from 'react'
import { Button } from '@/components/ui/Button'
import { useSubirFotoUsuario } from '../hooks/useSubirFotoUsuario'

export function SubirFotoUsuario({ usuarioId, fotoActual }: { usuarioId: string; fotoActual: string | null }) {
  const inputRef = useRef<HTMLInputElement>(null)
  const subirFoto = useSubirFotoUsuario()

  const manejarSeleccion = (e: React.ChangeEvent<HTMLInputElement>) => {
    const archivo = e.target.files?.[0]
    if (archivo) subirFoto.mutate({ id: usuarioId, archivo })
  }

  return (
    <div className="flex items-center gap-4">
      <div className="h-16 w-16 overflow-hidden rounded-full bg-surface">
        {fotoActual && <img src={fotoActual} alt="Foto del usuario" className="h-full w-full object-cover" />}
      </div>
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={manejarSeleccion} />
      <Button variante="secundario" onClick={() => inputRef.current?.click()} cargando={subirFoto.isPending}>
        Cambiar foto
      </Button>
    </div>
  )
}
