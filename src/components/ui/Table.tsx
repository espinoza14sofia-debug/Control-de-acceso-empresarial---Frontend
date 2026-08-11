import type { ReactNode } from 'react'

export interface ColumnaTabla<T> {
  encabezado: string
  render: (fila: T) => ReactNode
  claveAlineacion?: 'izquierda' | 'derecha' | 'centro'
}

interface TableProps<T> {
  columnas: ColumnaTabla<T>[]
  filas: T[]
  obtenerLlave: (fila: T) => string
  vacio?: ReactNode
}

export function Table<T>({ columnas, filas, obtenerLlave, vacio }: TableProps<T>) {
  if (filas.length === 0 && vacio) {
    return <>{vacio}</>
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-ink-300/50">
      <table className="min-w-full divide-y divide-ink-300/50 text-sm">
        <thead className="bg-surface">
          <tr>
            {columnas.map((columna) => (
              <th key={columna.encabezado} className="px-4 py-3 text-left font-medium text-ink-700">
                {columna.encabezado}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-ink-300/30 bg-white">
          {filas.map((fila) => (
            <tr key={obtenerLlave(fila)} className="hover:bg-surface/60">
              {columnas.map((columna) => (
                <td key={columna.encabezado} className="px-4 py-3 text-ink-900">
                  {columna.render(fila)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
