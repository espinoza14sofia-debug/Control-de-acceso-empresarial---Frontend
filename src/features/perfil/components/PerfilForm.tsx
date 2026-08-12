import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

interface DatosPerfil {
    nombreCompleto: string
}

interface Props {
    nombreActual: string
    cargando?: boolean
    onEnviar: (datos: DatosPerfil) => void
    onCancelar: () => void
}

export function PerfilForm({ nombreActual, cargando, onEnviar, onCancelar }: Props) {
    const { register, handleSubmit } = useForm<DatosPerfil>({
        defaultValues: { nombreCompleto: nombreActual },
    })

    return (
        <form onSubmit={handleSubmit(onEnviar)} className="flex flex-col gap-4">
            <Input
                etiqueta="Nombre completo"
                {...register('nombreCompleto', { required: true, minLength: 2 })}
            />

            <div className="flex gap-2">
                <Button type="submit" cargando={cargando}>
                    Guardar cambios
                </Button>
                <Button type="button" variante="secundario" onClick={onCancelar} disabled={cargando}>
                    Cancelar
                </Button>
            </div>
        </form>
    )
}