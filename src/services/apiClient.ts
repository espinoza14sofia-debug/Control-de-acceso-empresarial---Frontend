import axios, { AxiosError, type AxiosRequestConfig } from 'axios'
import { ApiError, type ApiErrorBody } from '@/types/api.types'

const ACCESS_TOKEN_KEY = 'controlacceso.accessToken'
const REFRESH_TOKEN_KEY = 'controlacceso.refreshToken'

export function guardarTokens(accessToken: string, refreshToken: string) {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
}

export function obtenerAccessToken(): string | null {
  return localStorage.getItem(ACCESS_TOKEN_KEY)
}

export function obtenerRefreshToken(): string | null {
  return localStorage.getItem(REFRESH_TOKEN_KEY)
}

export function limpiarTokens() {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
  localStorage.removeItem(REFRESH_TOKEN_KEY)
}

const baseURL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000'

/** Cliente axios base. Todos los `services/*Service.ts` de cada feature lo usan. */
export const apiClient = axios.create({ baseURL })

apiClient.interceptors.request.use((config) => {
  const token = obtenerAccessToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

let refrescandoSesion: Promise<string> | null = null

async function refrescarSesion(): Promise<string> {
  const refreshToken = obtenerRefreshToken()
  if (!refreshToken) throw new Error('No hay refresh token disponible')

  const respuesta = await axios.post(`${baseURL}/auth/refresh`, { refreshToken })
  const { accessToken, refreshToken: nuevoRefresh } = respuesta.data
  guardarTokens(accessToken, nuevoRefresh)
  return accessToken
}

apiClient.interceptors.response.use(
  (respuesta) => respuesta,
  async (error: AxiosError<ApiErrorBody>) => {
    const peticionOriginal = error.config as (AxiosRequestConfig & { _reintentado?: boolean }) | undefined

    // 401: intenta refrescar el token una vez y reintentar la peticion original.
    if (error.response?.status === 401 && peticionOriginal && !peticionOriginal._reintentado) {
      peticionOriginal._reintentado = true
      try {
        refrescandoSesion ??= refrescarSesion()
        const nuevoToken = await refrescandoSesion
        refrescandoSesion = null
        peticionOriginal.headers = { ...peticionOriginal.headers, Authorization: `Bearer ${nuevoToken}` }
        return apiClient.request(peticionOriginal)
      } catch {
        refrescandoSesion = null
        limpiarTokens()
        window.location.href = '/login'
      }
    }

    if (error.response?.data) {
      return Promise.reject(new ApiError(error.response.data))
    }
    return Promise.reject(error)
  },
)

/** Para POST /usuarios/:id/foto -> multipart/form-data, no JSON. */
export async function subirArchivo(url: string, campo: string, archivo: File) {
  const formData = new FormData()
  formData.append(campo, archivo)
  const respuesta = await apiClient.post(url, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return respuesta.data
}

/** Para GET /accesos/reporte-excel y /reporte-pdf -> respuesta binaria, no JSON. */
export async function descargarBlob(url: string, params?: Record<string, string | undefined>) {
  const respuesta = await apiClient.get(url, { params, responseType: 'blob' })
  return respuesta.data as Blob
}
