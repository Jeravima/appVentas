import {Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts'

const datas = [
  {
    name: 'Enero 2026',
    venta: 7500000,
    lista: 3500000
  },
    {
    name: 'Febrero 2026',
    venta: 8450500,
    lista: 5500000
  },
    {
    name: 'Marzo 2026',
    venta: 10575440,
    lista: 6458200
  },
    {
    name: 'Abril 2026',
    venta: 8520600,
    lista: 4599006
  }
]

export const BarCharts = () => {
  return (
    <div className="w-full h-80 bg-white p-4 rounded-xl shadow">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={datas} >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="venta" fill="#3ab64e" radius={6} />
          <Bar dataKey="lista" fill="#D72009" radius={6} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
