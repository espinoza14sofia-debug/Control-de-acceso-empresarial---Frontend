import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import type { AccessLog } from '@/features/accesos/types/acceso.types'

interface ActividadAccesosChartProps {
  registros: AccessLog[]
}

interface PuntoActividad {
  hora: string
  entradas: number
  salidas: number
}

export function ActividadAccesosChart({
  registros,
}: ActividadAccesosChartProps) {
  const datos = construirActividadPorHora(registros)

  const totalEntradas = registros.length

  const totalSalidas = registros.filter(
    (registro) => registro.exit_at !== null,
  ).length

  return (
    <article className="min-h-[330px] rounded-2xl border border-ink-200/70 bg-white p-6 shadow-sm">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-base font-semibold text-ink-900">
            Actividad de accesos
          </h2>

          <p className="mt-1 text-xs text-ink-400">
            Movimiento de entradas y salidas durante el día.
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-brand-600" />
            <span className="text-ink-500">
              Entradas
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-brand-300" />
            <span className="text-ink-500">
              Salidas
            </span>
          </div>
        </div>
      </div>

      <div className="mb-4 flex gap-5 text-xs text-ink-500">
        <span>
          <strong className="text-ink-900">
            {totalEntradas}
          </strong>{' '}
          entradas
        </span>

        <span>
          <strong className="text-ink-900">
            {totalSalidas}
          </strong>{' '}
          salidas
        </span>
      </div>

      {registros.length === 0 ? (
        <div className="flex h-[220px] items-center justify-center rounded-xl bg-surface">
          <div className="text-center">
            <p className="text-sm font-medium text-ink-700">
              Sin actividad registrada
            </p>

            <p className="mt-1 text-xs text-ink-400">
              Los accesos del día aparecerán aquí.
            </p>
          </div>
        </div>
      ) : (
        <div className="h-[230px] w-full">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <AreaChart
              data={datos}
              margin={{
                top: 10,
                right: 10,
                left: -20,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient
                  id="entradasGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="#9C6644"
                    stopOpacity={0.35}
                  />

                  <stop
                    offset="95%"
                    stopColor="#9C6644"
                    stopOpacity={0.03}
                  />
                </linearGradient>

                <linearGradient
                  id="salidasGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="#DDB892"
                    stopOpacity={0.35}
                  />

                  <stop
                    offset="95%"
                    stopColor="#DDB892"
                    stopOpacity={0.03}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#E7DDD6"
              />

              <XAxis
                dataKey="hora"
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: '#A89589',
                  fontSize: 11,
                }}
              />

              <YAxis
                allowDecimals={false}
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: '#A89589',
                  fontSize: 11,
                }}
              />

              <Tooltip
                cursor={{
                  stroke: '#DDB892',
                  strokeDasharray: '4 4',
                }}
                contentStyle={{
                  borderRadius: 12,
                  border: '1px solid #E6CCB2',
                  boxShadow:
                    '0 8px 30px rgba(51, 37, 31, 0.08)',
                  fontSize: 12,
                }}
              />

              <Area
                type="monotone"
                dataKey="entradas"
                name="Entradas"
                stroke="#9C6644"
                strokeWidth={2.5}
                fill="url(#entradasGradient)"
                activeDot={{
                  r: 4,
                }}
              />

              <Area
                type="monotone"
                dataKey="salidas"
                name="Salidas"
                stroke="#DDB892"
                strokeWidth={2}
                fill="url(#salidasGradient)"
                activeDot={{
                  r: 4,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </article>
  )
}

function construirActividadPorHora(
  registros: AccessLog[],
): PuntoActividad[] {
  const horas: PuntoActividad[] = []

  for (let hora = 6; hora <= 20; hora += 1) {
    horas.push({
      hora: `${hora.toString().padStart(2, '0')}:00`,
      entradas: 0,
      salidas: 0,
    })
  }

  registros.forEach((registro) => {
    const entrada = new Date(registro.entry_at)
    const horaEntrada = entrada.getHours()

    const puntoEntrada = horas.find(
      (_, index) => index + 6 === horaEntrada,
    )

    if (puntoEntrada) {
      puntoEntrada.entradas += 1
    }

    if (registro.exit_at) {
      const salida = new Date(registro.exit_at)
      const horaSalida = salida.getHours()

      const puntoSalida = horas.find(
        (_, index) => index + 6 === horaSalida,
      )

      if (puntoSalida) {
        puntoSalida.salidas += 1
      }
    }
  })

  return horas
}