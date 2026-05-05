import type { CommandParam, CommandReturnField } from '@/types'

export function ParamsTable({ params }: { params: CommandParam[] }) {
  if (!params.length) return <div className="text-[12px] text-[#9D9B96] italic">No parameters</div>
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-[12px]">
        <thead>
          <tr className="border-b border-[#e1dfda]">
            <th className="text-left py-2 pr-3 text-[10.5px] font-semibold text-[#9D9B96] uppercase tracking-wider">Param</th>
            <th className="text-left py-2 pr-3 text-[10.5px] font-semibold text-[#9D9B96] uppercase tracking-wider">Type</th>
            <th className="text-center py-2 pr-3 text-[10.5px] font-semibold text-[#9D9B96] uppercase tracking-wider">Req</th>
            <th className="text-left py-2 text-[10.5px] font-semibold text-[#9D9B96] uppercase tracking-wider">Description</th>
          </tr>
        </thead>
        <tbody>
          {params.map((p) => (
            <tr key={p.name} className="border-b border-[#f9f9f8]">
              <td className="py-2 pr-3 font-mono text-[#121212] whitespace-nowrap">{p.name}</td>
              <td className="py-2 pr-3 font-mono text-[#005BC4] whitespace-nowrap">{p.type}</td>
              <td className="py-2 pr-3 text-center">{p.required ? <span className="text-[#007CFB] font-bold">✓</span> : <span className="text-[#CECDCA]">—</span>}</td>
              <td className="py-2 text-[#373635]">{p.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function ReturnsTable({ returns }: { returns: CommandReturnField[] }) {
  if (!returns.length) return <div className="text-[12px] text-[#9D9B96] italic">No return value</div>
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-[12px]">
        <thead>
          <tr className="border-b border-[#e1dfda]">
            <th className="text-left py-2 pr-3 text-[10.5px] font-semibold text-[#9D9B96] uppercase tracking-wider">Field</th>
            <th className="text-left py-2 pr-3 text-[10.5px] font-semibold text-[#9D9B96] uppercase tracking-wider">Type</th>
            <th className="text-left py-2 text-[10.5px] font-semibold text-[#9D9B96] uppercase tracking-wider">Description</th>
          </tr>
        </thead>
        <tbody>
          {returns.map((r) => (
            <tr key={r.field} className="border-b border-[#f9f9f8]">
              <td className="py-2 pr-3 font-mono text-[#121212] whitespace-nowrap">{r.field}</td>
              <td className="py-2 pr-3 font-mono text-[#005BC4] whitespace-nowrap">{r.type}</td>
              <td className="py-2 text-[#373635]">{r.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
