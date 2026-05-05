'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { cn, commandCategoryColors, sdkColors } from '@/lib/utils'
import { ParamsTable, ReturnsTable } from './ParamsTable'
import { CodeBlock } from './CodeBlock'
import { UIKitSection } from './UIKitSection'
import type { MiniKitCommand, CommandSDK } from '@/types'

const SDK_TABS: { key: CommandSDK | 'all' | 'uikit'; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'minikit', label: 'MiniKit' },
  { key: 'idkit', label: 'IDKit' },
  { key: 'agentkit', label: 'AgentKit' },
  { key: 'uikit', label: 'UI Kit' },
]

const CAT_TABS = ['All', 'auth', 'payments', 'signing', 'messaging', 'permissions', 'notifications', 'ux']

interface Props { commands: MiniKitCommand[] }

export function CommandGrid({ commands }: Props) {
  const [sdk, setSdk] = useState<CommandSDK | 'all' | 'uikit'>('all')
  const [cat, setCat] = useState('All')
  const [openSlug, setOpenSlug] = useState<string | null>(null)

  const filtered = commands.filter((c) => {
    if (sdk === 'uikit') return false
    if (sdk !== 'all' && c.sdk !== sdk) return false
    if (cat !== 'All' && c.category !== cat) return false
    return true
  })

  return (
    <div>
      {/* SDK tabs */}
      <div className="flex gap-1 mb-3 flex-wrap">
        {SDK_TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => { setSdk(t.key); setOpenSlug(null) }}
            className={cn(
              'px-3 py-1.5 rounded text-[12.5px] font-semibold transition-colors',
              sdk === t.key
                ? t.key === 'all' || t.key === 'uikit' ? 'bg-[#121212] text-white' : sdkColors[t.key as CommandSDK]
                : 'bg-[#e1dfda] text-[#373635] hover:bg-[#CECDCA]'
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* UI Kit view */}
      {sdk === 'uikit' && <UIKitSection />}

      {/* Category tabs (SDK commands only) */}
      {sdk !== 'uikit' && <>
        <div className="flex gap-1 flex-wrap mb-4">
          {CAT_TABS.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={cn(
                'px-2.5 py-1 rounded text-[12px] font-medium transition-colors capitalize',
                cat === c ? 'bg-[#007CFB] text-white' : 'bg-[#f9f9f8] text-[#373635] hover:bg-[#e1dfda]'
              )}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="text-[11.5px] text-[#9D9B96] mb-3">{filtered.length} command{filtered.length !== 1 ? 's' : ''}</div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {filtered.map((cmd) => {
          const isOpen = openSlug === cmd.slug
          return (
            <div
              key={cmd.slug}
              className={cn(
                'bg-white border rounded-lg overflow-hidden transition-colors',
                isOpen ? 'border-[#121212] lg:col-span-2' : 'border-[#CECDCA]'
              )}
            >
              {/* Header */}
              <button
                className="w-full text-left px-4 py-3.5 hover:bg-[#f9f9f8] transition-colors"
                onClick={() => setOpenSlug(isOpen ? null : cmd.slug)}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <code className="font-mono text-[13.5px] font-semibold text-[#121212]">{cmd.name}</code>
                      <span className={cn('text-[11px] font-semibold px-2 py-0.5 rounded', sdkColors[cmd.sdk])}>
                        {cmd.sdk}
                      </span>
                      <span className={cn('text-[11px] font-semibold px-2 py-0.5 rounded capitalize', commandCategoryColors[cmd.category])}>
                        {cmd.category}
                      </span>
                      {cmd.backendRequired && (
                        <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-[#EBF5FF] text-[#005BC4]">
                          backend req
                        </span>
                      )}
                    </div>
                    <p className="text-[12px] text-[#9D9B96] mt-1.5 leading-relaxed">{cmd.description}</p>
                  </div>
                  <span className="text-[#9D9B96] text-[14px] shrink-0 mt-0.5">{isOpen ? '−' : '+'}</span>
                </div>
              </button>

              {/* Expanded */}
              {isOpen && (
                <div className="border-t border-[#e1dfda] px-4 pb-4 space-y-4">
                  <p className="text-[12.5px] text-[#373635] leading-relaxed pt-4">{cmd.longDescription}</p>

                  {cmd.prereqs && cmd.prereqs.length > 0 && (
                    <div>
                      <div className="text-[10.5px] font-semibold text-[#007CFB] uppercase tracking-wider mb-2">Prerequisites</div>
                      <ul className="space-y-1">
                        {cmd.prereqs.map((p) => (
                          <li key={p} className="text-[12px] text-[#373635] flex items-center gap-2">
                            <span className="text-[#007CFB]">✓</span> {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div>
                    <div className="text-[10.5px] font-semibold text-[#9D9B96] uppercase tracking-wider mb-2">Parameters</div>
                    <ParamsTable params={cmd.params} />
                  </div>

                  <div>
                    <div className="text-[10.5px] font-semibold text-[#9D9B96] uppercase tracking-wider mb-2">Returns</div>
                    <ReturnsTable returns={cmd.returns} />
                  </div>

                  <div>
                    <div className="text-[10.5px] font-semibold text-[#9D9B96] uppercase tracking-wider mb-2">Code Example</div>
                    <CodeBlock code={cmd.codeExample} label="TypeScript" />
                  </div>

                  <div>
                    <div className="text-[10.5px] font-semibold text-[#9D9B96] uppercase tracking-wider mb-2">LLM Prompt</div>
                    <div className="bg-[#f9f9f8] border border-[#e1dfda] rounded-md p-3 relative">
                      <button
                        onClick={async () => {
                          await navigator.clipboard.writeText(cmd.llmPrompt)
                          toast.success('Prompt copied')
                        }}
                        className="absolute top-2 right-2 text-[11px] font-semibold text-[#007CFB] bg-white border border-[#CECDCA] px-2 py-0.5 rounded hover:bg-[#EBF5FF] transition-colors"
                      >
                        Copy prompt
                      </button>
                      <pre className="text-[12px] text-[#373635] leading-relaxed whitespace-pre-wrap pr-20">{cmd.llmPrompt}</pre>
                    </div>
                  </div>

                  {cmd.errorCodes && cmd.errorCodes.length > 0 && (
                    <div>
                      <div className="text-[10.5px] font-semibold text-[#9D9B96] uppercase tracking-wider mb-2">Error Codes</div>
                      <div className="flex flex-wrap gap-1.5">
                        {cmd.errorCodes.map((e) => (
                          <code key={e} className="text-[11px] bg-[#e1dfda] text-[#373635] px-2 py-0.5 rounded font-mono">
                            {e}
                          </code>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )
          })}
        </div>
      </>}
    </div>
  )
}
