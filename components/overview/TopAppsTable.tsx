import Image from 'next/image'
import { fmtNum, appCategoryColors, cn } from '@/lib/utils'
import type { WorldApp } from '@/types'

interface Props { apps: WorldApp[] }

export function TopAppsTable({ apps }: Props) {
  return (
    <div className="bg-white border border-[#CECDCA] rounded-lg overflow-hidden">
      <div className="px-4 py-3 border-b border-[#e1dfda]">
        <div className="font-semibold text-[13px] text-[#121212]">Top Apps by Users</div>
        <div className="text-[11px] text-[#9D9B96] mt-0.5">Ranked by unique verified users</div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-[#e1dfda]">
              {['#', 'App', 'Category', 'Users', '★ Rating', 'Team'].map((h) => (
                <th
                  key={h}
                  className="text-left px-3 py-2 text-[10.5px] font-semibold text-[#9D9B96] uppercase tracking-wider whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {apps.map((app, i) => {
              const badgeClass = appCategoryColors[app.category?.name ?? 'Other']
              return (
                <tr key={app.app_id} className="border-b border-[#f9f9f8] hover:bg-[#f9f9f8] transition-colors">
                  <td className="px-3 py-2.5 text-[12px] text-[#9D9B96] font-medium w-8">{i + 1}</td>
                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-2">
                      <div className="relative w-7 h-7 rounded-lg overflow-hidden shrink-0 bg-[#e1dfda]">
                        {app.logo_img_url && (
                          <Image
                            src={app.logo_img_url}
                            alt={app.name}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        )}
                      </div>
                      <span className="text-[12.5px] font-medium text-[#121212] whitespace-nowrap">{app.name}</span>
                    </div>
                  </td>
                  <td className="px-3 py-2.5">
                    <span className={cn('text-[11px] font-semibold px-2 py-0.5 rounded', badgeClass)}>
                      {app.category?.name}
                    </span>
                  </td>
                  <td className="px-3 py-2.5 text-[12.5px] font-semibold text-[#121212] whitespace-nowrap">
                    {fmtNum(app.unique_users)}
                  </td>
                  <td className="px-3 py-2.5 text-[12.5px] font-semibold text-[#007CFB] whitespace-nowrap">
                    {app.app_rating.toFixed(2)}
                  </td>
                  <td className="px-3 py-2.5 text-[12px] text-[#9D9B96] whitespace-nowrap">
                    {app.team_name}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
