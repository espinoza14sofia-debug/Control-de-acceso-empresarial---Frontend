import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'

interface ToastItem {
  id: number
  mensaje: string
  tono: 'exito' | 'error'
}

interface ToastContextValue {
  mostrarToast: (mensaje: string, tono?: ToastItem['tono']) => void
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const mostrarToast = useCallback((mensaje: string, tono: ToastItem['tono'] = 'exito') => {
    const id = Date.now()
    setToasts((actual) => [...actual, { id, mensaje, tono }])
    setTimeout(() => {
      setToasts((actual) => actual.filter((t) => t.id !== id))
    }, 4000)
  }, [])

  return (
    <ToastContext.Provider value={{ mostrarToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`rounded-md px-4 py-2 text-sm text-white shadow-lg ${
              toast.tono === 'exito' ? 'bg-success-500' : 'bg-danger-500'
            }`}
          >
            {toast.mensaje}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) throw new Error('useToast debe usarse dentro de <ToastProvider>')
  return context
}
