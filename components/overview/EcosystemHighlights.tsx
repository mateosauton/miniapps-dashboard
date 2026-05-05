import type { CategoryStat } from '@/types'

interface Props { categories: CategoryStat[] }

export function EcosystemHighlights({ categories }: Props) {
  const sorted = [...categories].sort((a, b) => b.conversionRate - a.conversionRate)
  const maxConv = sorted[0]?.conversionRate ?? 1

  return (
    <div className="bg-white border border-[#CECDCA] rounded-lg p-4">
      <div className="text-[10.5px] font-semibold text-[#9D9B96] uppercase tracking-wider mb-1">
        Impressions → User Conversion
      </div>
      <div className="text-[11px] text-[#9D9B96] mb-4">Users ÷ Impressions per category</div>
      <div className="space-y-2.5">
        {sorted.map((cat) => {
          const pct = maxConv > 0 ? (cat.conversionRate / maxConv) * 100 : 0
          return (
            <div key={cat.name}>
              <div className="flex justify-between mb-1">
                <span className="text-[12px] font-medium text-[#2D2C2C]">{cat.name}</span>
                <span className="text-[12px] font-semibold text-[#121212]">
                  {cat.conversionRate.toFixed(2)}%
                </span>
              </div>
              <div className="h-1.5 bg-[#e1dfda] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-[#007CFB] transition-all duration-500"
                  style={{ width: `${pct}%`, opacity: 0.4 + (pct / 100) * 0.6 }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
