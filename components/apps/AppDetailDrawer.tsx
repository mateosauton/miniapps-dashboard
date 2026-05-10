'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { cn, fmtNum, appCategoryColors } from '@/lib/utils'
import type { WorldApp, AppMetrics } from '@/types'

interface Props {
  app: WorldApp | null
  metrics?: AppMetrics
  onClose: () => void
}

function StatBox({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="bg-[#f9f9f8] rounded-lg p-3 text-center">
      <div className="text-[15px] font-semibold text-[#121212]">{value}</div>
      {sub && <div className="text-[10.5px] text-[#007CFB] font-medium">{sub}</div>}
      <div className="text-[10px] text-[#9D9B96] mt-0.5">{label}</div>
    </div>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[10.5px] font-semibold text-[#9D9B96] uppercase tracking-wider mb-2">
      {children}
    </div>
  )
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2.5 border-b border-[#f9f9f8] last:border-0">
      <span className="text-[12px] text-[#9D9B96] shrink-0 w-36">{label}</span>
      <span className="text-[12px] text-[#373635] text-right flex-1 break-all">{value}</span>
    </div>
  )
}

function ExternalLink({ href, label }: { href: string; label?: string }) {
  const display = label ?? href.replace(/^https?:\/\//, '').replace(/^mailto:/, '')
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between px-3 py-2.5 bg-[#f9f9f8] hover:bg-[#e1dfda] rounded-lg text-[12.5px] text-[#121212] font-medium transition-colors group"
    >
      <span className="truncate">{display}</span>
      <svg className="shrink-0 ml-2 text-[#9D9B96] group-hover:text-[#121212]" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <path d="M7 17L17 7M7 7h10v10" />
      </svg>
    </a>
  )
}

const LANG_NAMES: Record<string, string> = {
  en: 'English', es: 'Spanish', fr: 'French', de: 'German', pt: 'Portuguese',
  it: 'Italian', ja: 'Japanese', ko: 'Korean', zh: 'Chinese', ru: 'Russian',
  ar: 'Arabic', hi: 'Hindi', tr: 'Turkish', nl: 'Dutch', pl: 'Polish',
  sv: 'Swedish', da: 'Danish', fi: 'Finnish', no: 'Norwegian', id: 'Indonesian',
  ca: 'Catalan', zh_CN: 'Chinese (Simplified)', zh_TW: 'Chinese (Traditional)',
  es_419: 'Spanish (Latin America)', pt_BR: 'Portuguese (Brazil)',
}

function ShowcaseGallery({ urls }: { urls: string[] }) {
  const [active, setActive] = useState(0)
  const [failed, setFailed] = useState<Set<number>>(new Set())

  const valid = urls.filter((u, i) => u && !failed.has(i))
  if (valid.length === 0) return null

  return (
    <div>
      <SectionLabel>Screenshots ({urls.length})</SectionLabel>
      {/* Main image */}
      <div className="relative w-full aspect-[9/16] max-h-[320px] bg-[#f9f9f8] rounded-xl overflow-hidden mb-2">
        <Image
          key={urls[active]}
          src={urls[active]}
          alt={`Screenshot ${active + 1}`}
          fill
          className="object-contain"
          unoptimized
          onError={() => setFailed((prev) => new Set([...prev, active]))}
        />
        {urls.length > 1 && (
          <>
            <button
              onClick={() => setActive((a) => Math.max(0, a - 1))}
              disabled={active === 0}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/80 hover:bg-white flex items-center justify-center disabled:opacity-30 transition-all"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#121212" strokeWidth="2.5" strokeLinecap="round"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <button
              onClick={() => setActive((a) => Math.min(urls.length - 1, a + 1))}
              disabled={active === urls.length - 1}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/80 hover:bg-white flex items-center justify-center disabled:opacity-30 transition-all"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#121212" strokeWidth="2.5" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
            </button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {urls.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={cn('w-1.5 h-1.5 rounded-full transition-all', i === active ? 'bg-[#121212]' : 'bg-[#121212]/30')}
                />
              ))}
            </div>
          </>
        )}
      </div>
      {/* Thumbnails */}
      {urls.length > 1 && (
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {urls.map((url, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={cn(
                'relative shrink-0 w-14 aspect-[9/16] rounded-md overflow-hidden bg-[#f9f9f8] border-2 transition-all',
                i === active ? 'border-[#121212]' : 'border-transparent hover:border-[#CECDCA]'
              )}
            >
              {!failed.has(i) && (
                <Image src={url} alt="" fill className="object-cover" unoptimized
                  onError={() => setFailed((prev) => new Set([...prev, i]))} />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export function AppDetailDrawer({ app, metrics, onClose }: Props) {
  const [imgFailed, setImgFailed] = useState(false)

  useEffect(() => { setImgFailed(false) }, [app?.app_id])

  useEffect(() => {
    if (!app) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [app, onClose])

  useEffect(() => {
    if (app) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [app])

  if (!app) return null

  const catColor = appCategoryColors[app.category?.name ?? 'Other'] ?? 'bg-[#f9f9f8] text-[#373635]'
  const initials = app.short_name?.slice(0, 3).toUpperCase() ?? app.name.slice(0, 2).toUpperCase()
  const langs = app.supported_languages ?? []
  const countries = app.supported_countries ?? []
  const showcaseUrls = (app.showcase_img_urls ?? []).filter(Boolean)
  const contracts = (app.contracts ?? []).filter((c) => c !== 'all')
  const domains = (app.associated_domains ?? []).filter(Boolean)

  const links: { href: string; label?: string }[] = []
  if (app.app_website_url) links.push({ href: app.app_website_url })
  if (app.integration_url && app.integration_url !== app.app_website_url)
    links.push({ href: app.integration_url, label: `↗ ${app.integration_url.replace(/^https?:\/\//, '')}` })
  if (app.support_link) links.push({ href: app.support_link, label: `Support: ${app.support_link.replace(/^mailto:/, '').replace(/^https?:\/\//, '')}` })
  if (app.source_code_url) links.push({ href: app.source_code_url, label: 'Source code ↗' })

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/30 z-40" onClick={onClose} />

      {/* Panel */}
      <div className="fixed right-0 top-0 h-full w-full max-w-[440px] bg-white z-50 shadow-2xl flex flex-col overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#e1dfda] shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-[#e1dfda] flex items-center justify-center">
              {app.logo_img_url && !imgFailed ? (
                <Image src={app.logo_img_url} alt={app.name} fill className="object-cover" unoptimized
                  onError={() => setImgFailed(true)} />
              ) : (
                <span className="text-[13px] font-bold text-[#9D9B96]">{initials}</span>
              )}
            </div>
            <div>
              <div className="font-semibold text-[14px] text-[#121212] leading-tight">{app.name}</div>
              <div className="text-[12px] text-[#9D9B96] mt-0.5">{app.team_name}</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f9f9f8] hover:bg-[#e1dfda] flex items-center justify-center transition-colors"
            aria-label="Close"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9D9B96" strokeWidth="2.5" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-5 py-4 space-y-5">

            {/* Badges */}
            <div className="flex flex-wrap gap-1.5">
              <span className={cn('text-[11px] font-semibold px-2 py-0.5 rounded', catColor)}>
                {app.category?.name ?? 'Other'}
              </span>
              <span className={cn(
                'text-[11px] font-medium px-2 py-0.5 rounded',
                app.verification_status === 'verified' ? 'bg-[#EBF5FF] text-[#007CFB]' : 'bg-[#f9f9f8] text-[#9D9B96]'
              )}>
                {app.verification_status}
              </span>
              {app.app_mode === 'native' && (
                <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-[#121212] text-white">native</span>
              )}
              {app.is_for_humans_only && (
                <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-[#EBF5FF] text-[#007CFB]">humans only</span>
              )}
              {app.is_android_only && (
                <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-[#f9f9f8] text-[#9D9B96]">android only</span>
              )}
              {app.show_in_app_store === false && (
                <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-[#f9f9f8] text-[#9D9B96]">not in store</span>
              )}
            </div>

            {/* CTA button text */}
            {app.world_app_button_text && (
              <div className="inline-flex items-center gap-2 bg-[#121212] text-white text-[12px] font-semibold px-4 py-2 rounded-full">
                {app.world_app_button_text}
              </div>
            )}

            {/* Description — overview field (richer) */}
            {app.description?.overview && (
              <div>
                <SectionLabel>Overview</SectionLabel>
                <p className="text-[13px] text-[#373635] leading-relaxed">{app.description.overview}</p>
              </div>
            )}

            {/* Description — world_app_description fallback */}
            {!app.description?.overview && app.world_app_description && (
              <div>
                <SectionLabel>Description</SectionLabel>
                <p className="text-[13px] text-[#373635] leading-relaxed">{app.world_app_description}</p>
              </div>
            )}

            {/* How it works */}
            {app.description?.how_it_works && (
              <div>
                <SectionLabel>How it works</SectionLabel>
                <p className="text-[13px] text-[#373635] leading-relaxed">{app.description.how_it_works}</p>
              </div>
            )}

            {/* How to connect */}
            {app.description?.how_to_connect && (
              <div>
                <SectionLabel>How to connect</SectionLabel>
                <p className="text-[13px] text-[#373635] leading-relaxed">{app.description.how_to_connect}</p>
              </div>
            )}

            {/* Showcase images */}
            {showcaseUrls.length > 0 && <ShowcaseGallery urls={showcaseUrls} />}

            {/* Stats */}
            <div>
              <SectionLabel>Stats</SectionLabel>
              <div className="grid grid-cols-3 gap-2">
                <StatBox label="unique users" value={fmtNum(app.unique_users)} />
                <StatBox label="rating" value={app.app_rating.toFixed(2)} sub="★" />
                <StatBox label="impressions" value={fmtNum(app.impressions)} />
                <StatBox label="countries" value={String(countries.length)} />
                <StatBox label="languages" value={String(langs.length)} />
                <StatBox label="cat. rank" value={app.category_ranking ? `#${app.category_ranking}` : '—'} />
                {metrics && <StatBox label="users (7d)" value={fmtNum(metrics.users7d)} />}
                {metrics && <StatBox label="new users (7d)" value={fmtNum(metrics.newUsers7d)} />}
                {metrics && <StatBox label="impr. (7d)" value={fmtNum(metrics.impressions7d)} />}
              </div>
            </div>

            {/* Notifications */}
            {(app.avg_notification_open_rate !== null || app.max_notifications_per_day > 0 || metrics?.optInRate != null) && (
              <div>
                <SectionLabel>Notifications</SectionLabel>
                <div className="grid grid-cols-2 gap-2">
                  {app.avg_notification_open_rate !== null && (
                    <StatBox label="avg open rate" value={`${(app.avg_notification_open_rate * 100).toFixed(1)}%`} />
                  )}
                  {metrics?.optInRate != null && (
                    <StatBox label="opt-in rate (7d)" value={`${(metrics.optInRate * 100).toFixed(1)}%`} />
                  )}
                  {app.max_notifications_per_day > 0 && (
                    <StatBox label="max per day" value={String(app.max_notifications_per_day)} />
                  )}
                </div>
              </div>
            )}

            {/* Links */}
            {links.length > 0 && (
              <div>
                <SectionLabel>Links</SectionLabel>
                <div className="space-y-1.5">
                  {links.map((l) => <ExternalLink key={l.href} href={l.href} label={l.label} />)}
                </div>
              </div>
            )}

            {/* App details table */}
            <div>
              <SectionLabel>Details</SectionLabel>
              <div className="bg-[#f9f9f8] rounded-lg px-3 divide-y divide-[#f0f0ef]">
                <InfoRow label="App ID" value={<code className="font-mono text-[10.5px] break-all">{app.app_id}</code>} />
                <InfoRow label="Short name" value={app.short_name || '—'} />
                <InfoRow label="Team" value={app.team_name} />
                <InfoRow label="Mode" value={app.app_mode} />
                <InfoRow label="Verification" value={app.verification_status} />
                {(app.whitelisted_addresses?.length ?? 0) > 0 && (
                  <InfoRow label="Whitelisted addrs" value={`${app.whitelisted_addresses!.length} address${app.whitelisted_addresses!.length !== 1 ? 'es' : ''}`} />
                )}
                {(app.permit2_tokens?.length ?? 0) > 0 && (
                  <InfoRow label="Permit2 tokens" value={app.permit2_tokens!.join(', ')} />
                )}
              </div>
            </div>

            {/* Contracts */}
            {contracts.length > 0 && (
              <div>
                <SectionLabel>Contracts ({contracts.length})</SectionLabel>
                <div className="space-y-1">
                  {contracts.map((addr) => (
                    <div key={addr} className="flex items-center gap-2 bg-[#f9f9f8] rounded-lg px-3 py-2">
                      <code className="text-[11px] font-mono text-[#373635] truncate flex-1">{addr}</code>
                      <a
                        href={`https://worldscan.org/address/${addr}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10.5px] text-[#007CFB] font-medium shrink-0 hover:underline"
                      >
                        View ↗
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Associated domains */}
            {domains.length > 0 && (
              <div>
                <SectionLabel>Associated Domains ({domains.length})</SectionLabel>
                <div className="flex flex-wrap gap-1.5">
                  {domains.map((d) => (
                    <span key={d} className="text-[11px] px-2 py-0.5 rounded bg-[#f9f9f8] text-[#373635] border border-[#e1dfda] font-mono truncate max-w-full">
                      {d.replace(/^https?:\/\//, '')}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Languages */}
            {langs.length > 0 && (
              <div>
                <SectionLabel>Languages ({langs.length})</SectionLabel>
                <div className="flex flex-wrap gap-1.5">
                  {langs.map((code) => (
                    <span key={code} className="text-[11px] px-2 py-0.5 rounded bg-[#f9f9f8] text-[#373635] border border-[#e1dfda]">
                      {LANG_NAMES[code] ?? code}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Countries */}
            {countries.length > 0 && (
              <div>
                <SectionLabel>Countries ({countries.length})</SectionLabel>
                <div className="flex flex-wrap gap-1">
                  {countries.slice(0, 60).map((code) => (
                    <span key={code} className="text-[10.5px] px-1.5 py-0.5 rounded bg-[#f9f9f8] text-[#9D9B96] border border-[#e1dfda] font-mono">
                      {code}
                    </span>
                  ))}
                  {countries.length > 60 && (
                    <span className="text-[10.5px] px-1.5 py-0.5 text-[#9D9B96]">+{countries.length - 60} more</span>
                  )}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  )
}
