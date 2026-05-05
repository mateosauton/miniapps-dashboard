import { fmtNum, categoryBarColors, appCategoryColors } from '@/lib/utils'
import { cn } from '@/lib/utils'
import type { CategoryStat } from '@/types'

interface Props { categories: CategoryStat[] }

export function CategoryBreakdown({ categories }: Props) {
  const maxUsers = Math.max(...categories.map((c) => c.totalUsers))

  return (
    <div className="bg-white border border-[#CECDCA] rounded-lg p-4">
      <div className="text-[10.5px] font-semibold text-[#9D9B96] uppercase tracking-wider mb-1">
        Category Breakdown
      </div>
      <div className="text-[11px] text-[#9D9B96] mb-4">Apps count · user share per category</div>

      <div className="space-y-3">
        {categories.map((cat) => {
          const pct = maxUsers > 0 ? (cat.totalUsers / maxUsers) * 100 : 0
          const barColor = categoryBarColors[cat.name] ?? '#CECDCA'
          const badgeClass = appCategoryColors[cat.name] ?? 'bg-[#e1dfda] text-[#9D9B96]'

          return (
            <div key={cat.name}>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className={cn('text-[11px] font-semibold px-2 py-0.5 rounded', badgeClass)}>
                    {cat.name}
                  </span>
                  <span className="text-[11px] text-[#9D9B96]">{cat.appCount} apps</span>
                </div>
                <div className="text-right">
                  <span className="text-[12px] font-semibold text-[#121212]">{fmtNum(cat.totalUsers)}</span>
                  <span className="text-[11px] text-[#9D9B96] ml-1">users</span>
                </div>
              </div>
              <div className="h-1.5 bg-[#e1dfda] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${pct}%`, background: barColor }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
