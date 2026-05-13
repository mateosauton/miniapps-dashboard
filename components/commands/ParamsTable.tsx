import type { CommandParam, CommandReturnField } from '@/types'

export function ParamsTable({ params }: { params: CommandParam[] }) {
  if (!params.length) return <div className="text-[11.5px] text-gray-500 italic">No parameters</div>
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-[11.5px]">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-1.5 pr-3 text-[9.5px] font-semibold text-gray-500 uppercase tracking-wider">Param</th>
            <th className="text-left py-1.5 pr-3 text-[9.5px] font-semibold text-gray-500 uppercase tracking-wider">Type</th>
            <th className="text-center py-1.5 pr-3 text-[9.5px] font-semibold text-gray-500 uppercase tracking-wider">Req</th>
            <th className="text-left py-1.5 text-[9.5px] font-semibold text-gray-500 uppercase tracking-wider">Description</th>
          </tr>
        </thead>
        <tbody>
          {params.map((p) => (
            <tr key={p.name} className="border-b border-gray-50">
              <td className="py-1.5 pr-3 font-mono text-gray-900 whitespace-nowrap">{p.name}</td>
              <td className="py-1.5 pr-3 font-mono text-info-700 whitespace-nowrap">{p.type}</td>
              <td className="py-1.5 pr-3 text-center">{p.required ? <span className="text-info-600 font-bold">✓</span> : <span className="text-gray-300">—</span>}</td>
              <td className="py-1.5 text-gray-700">{p.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function ReturnsTable({ returns }: { returns: CommandReturnField[] }) {
  if (!returns.length) return <div className="text-[11.5px] text-gray-500 italic">No return value</div>
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-[11.5px]">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-1.5 pr-3 text-[9.5px] font-semibold text-gray-500 uppercase tracking-wider">Field</th>
            <th className="text-left py-1.5 pr-3 text-[9.5px] font-semibold text-gray-500 uppercase tracking-wider">Type</th>
            <th className="text-left py-1.5 text-[9.5px] font-semibold text-gray-500 uppercase tracking-wider">Description</th>
          </tr>
        </thead>
        <tbody>
          {returns.map((r) => (
            <tr key={r.field} className="border-b border-gray-50">
              <td className="py-1.5 pr-3 font-mono text-gray-900 whitespace-nowrap">{r.field}</td>
              <td className="py-1.5 pr-3 font-mono text-info-700 whitespace-nowrap">{r.type}</td>
              <td className="py-1.5 text-gray-700">{r.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
