import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { useRestablecerPassword } from '../hooks/useRestablecerPassword'

interface FormValues {
  nuevaContrasena: string
}

/** El accessToken llega como query string desde el enlace del correo de Supabase. */
export function RestablecerPasswordForm() {
  const [searchParams] = useSearchParams()
  const accessToken = searchParams.get('accessToken') ?? ''
  const { register, handleSubmit } = useForm<FormValues>()
  const restablecer = useRestablecerPassword()

  if (restablecer.isSuccess) {
    return <p className="text-sm text-ink-700">{restablecer.data.mensaje}</p>
  }

  return (
    <form
      onSubmit={handleSubmit((valores) => restablecer.mutate({ accessToken, nuevaContrasena: valores.nuevaContrasena }))}
      className="flex flex-col gap-4"
    >
      <Input
        etiqueta="Nueva contraseña"
        type="password"
        id="nuevaContrasena"
        {...register('nuevaContrasena', { required: true, minLength: 6 })}
      />
      <Button type="submit" cargando={restablecer.isPending} className="w-full">
        Restablecer contraseña
      </Button>
    </form>
  )
}
