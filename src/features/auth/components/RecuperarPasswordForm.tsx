import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { useRecuperarPassword } from '../hooks/useRecuperarPassword'

interface FormValues {
  email: string
}

export function RecuperarPasswordForm() {
  const { register, handleSubmit } = useForm<FormValues>()
  const recuperar = useRecuperarPassword()

  if (recuperar.isSuccess) {
    return (
      <p className="text-sm text-ink-700">{recuperar.data.mensaje}</p>
    )
  }

  return (
    <form onSubmit={handleSubmit((valores) => recuperar.mutate(valores))} className="flex flex-col gap-4">
      <Input etiqueta="Correo electronico" type="email" id="email" {...register('email', { required: true })} />
      <Button type="submit" cargando={recuperar.isPending} className="w-full">
        Enviar instrucciones
      </Button>
    </form>
  )
}
