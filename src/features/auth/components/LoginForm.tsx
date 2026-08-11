import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { useLogin } from '../hooks/useLogin'
import { RUTAS } from '@/constants/rutas'
import { ApiError } from '@/types/api.types'

interface FormValues {
  email: string
  password: string
}

export function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>()
  const login = useLogin()

  return (
    <form onSubmit={handleSubmit((valores) => login.mutate(valores))} className="flex flex-col gap-4">
      <Input
        etiqueta="Correo electronico"
        type="email"
        id="email"
        error={errors.email?.message}
        {...register('email', { required: 'El correo es obligatorio' })}
      />
      <Input
        etiqueta="Contraseña"
        type="password"
        id="password"
        error={errors.password?.message}
        {...register('password', { required: 'La contraseña es obligatoria' })}
      />

      {login.isError && (
        <p className="text-sm text-danger-500">
          {login.error instanceof ApiError ? login.error.message : 'No se pudo iniciar sesion.'}
        </p>
      )}

      <Button type="submit" cargando={login.isPending} className="w-full">
        Iniciar sesion
      </Button>

      <Link to={RUTAS.RECUPERAR_PASSWORD} className="text-center text-sm text-brand-600 hover:underline">
        ¿Olvidaste tu contraseña?
      </Link>
    </form>
  )
}
