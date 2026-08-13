import { Modal } from './Modal'
import { Button } from './Button'

interface Props {
    abierto: boolean
    titulo: string
    mensaje: string
    cargando?: boolean
    textoConfirmar?: string
    onConfirmar: () => void
    onCancelar: () => void
}

/** Confirmación genérica para acciones destructivas (eliminar, desactivar, etc). */
export function ConfirmDialog({
    abierto,
    titulo,
    mensaje,
    cargando,
    textoConfirmar = 'Eliminar',
    onConfirmar,
    onCancelar,
}: Props) {
    return (
        <Modal abierto={abierto} titulo={titulo} onCerrar={onCancelar}>
            <p className="text-sm text-ink-600">{mensaje}</p>

            <div className="mt-5 flex justify-end gap-2">
                <Button variante="secundario" onClick={onCancelar} disabled={cargando}>
                    Cancelar
                </Button>
                <Button variante="peligro" onClick={onConfirmar} cargando={cargando}>
                    {textoConfirmar}
                </Button>
            </div>
        </Modal>
    )
}