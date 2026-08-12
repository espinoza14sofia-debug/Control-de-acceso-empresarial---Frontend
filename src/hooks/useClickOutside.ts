import { useEffect, type RefObject } from 'react'

/**
 * Ejecuta `onOutside` cuando se hace click fuera de `ref`, o al presionar Escape.
 * Pensado para menus desplegables (Navbar, dropdowns de filtros, etc).
 */
export function useClickOutside(ref: RefObject<HTMLElement | null>, onOutside: () => void, activo = true) {
  useEffect(() => {
    if (!activo) return

    function manejarClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onOutside()
      }
    }

    function manejarTecla(event: KeyboardEvent) {
      if (event.key === 'Escape') onOutside()
    }

    document.addEventListener('mousedown', manejarClick)
    document.addEventListener('keydown', manejarTecla)

    return () => {
      document.removeEventListener('mousedown', manejarClick)
      document.removeEventListener('keydown', manejarTecla)
    }
  }, [ref, onOutside, activo])
}