'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { cn, commandCategoryColors, sdkColors } from '@/lib/utils'
import { ParamsTable, ReturnsTable } from './ParamsTable'
import { CodeBlock } from './CodeBlock'
import { UIKitSection } from './UIKitSection'
import { COMMAND_CATEGORIES } from '@/lib/config'
import type { MiniKitCommand, CommandSDK } from '@/types'

const SDK_TABS: { key: CommandSDK | 'uikit'; label: string }[] = [
  { key: 'minikit', label: 'MiniKit' },
  { key: 'idkit', label: 'IDKit' },
  { key: 'agentkit', label: 'AgentKit' },
  { key: 'uikit', label: 'UI Kit' },
]

const CAT_TABS = COMMAND_CATEGORIES

interface Props { commands: MiniKitCommand[] }

export function CommandGrid({ commands }: Props) {
  const [sdk, setSdk] = useState<CommandSDK | 'uikit'>('minikit')
  const [cat, setCat] = useState('All')
  const [openSlug, setOpenSlug] = useState<string | null>(null)

  const filtered = commands.filter((c) => {
    if (sdk === 'uikit') return false
    if (c.sdk !== sdk) return false
    if (cat !== 'All' && c.category !== cat) return false
    return true
  })

  return (
    <div>
      {/* SDK tabs */}
      <div className="flex gap-1 mb-2.5 flex-wrap">
        {SDK_TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => { setSdk(t.key); setOpenSlug(null) }}
            aria-label={t.label}
            className={cn(
              'h-7 px-2.5 rounded-md text-[11.5px] font-semibold transition-colors',
              sdk === t.key
                ? t.key === 'uikit' ? 'bg-gray-900 text-gray-0' : sdkColors[t.key as CommandSDK]
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
        <div className="flex gap-1 flex-wrap mb-3">
          {CAT_TABS.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              aria-label={c}
              className={cn(
                'h-7 px-2 rounded-md text-[11.5px] font-medium transition-colors capitalize',
                cat === c ? 'bg-gray-900 text-gray-0' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              )}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="text-[11px] text-gray-500 mb-2.5">{filtered.length} command{filtered.length !== 1 ? 's' : ''}</div>

        {/* Cards */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-2.5">
          {filtered.map((cmd) => {
          const isOpen = openSlug === cmd.slug
          return (
            <div
              key={cmd.slug}
              className={cn(
                'bg-gray-0 border rounded-lg overflow-hidden transition-colors',
                isOpen ? 'border-gray-900 xl:col-span-2' : 'border-gray-200'
              )}
            >
              {/* Header */}
              <button
                aria-label="Toggle command details"
                className="w-full text-left px-3 py-2.5 hover:bg-gray-50 transition-colors"
                onClick={() => setOpenSlug(isOpen ? null : cmd.slug)}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <code className="font-mono text-[12.5px] font-semibold text-gray-900">{cmd.name}</code>
                      <span className={cn('text-[10px] font-semibold px-1.5 py-0.5 rounded', sdkColors[cmd.sdk])}>
                        {cmd.sdk}
                      </span>
                      <span className={cn('text-[10px] font-semibold px-1.5 py-0.5 rounded capitalize', commandCategoryColors[cmd.category])}>
                        {cmd.category}
                      </span>
                      {cmd.backendRequired && (
                        <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-info-100 text-info-700">
                          backend req
                        </span>
                      )}
                    </div>
                    <p className="text-[11.5px] text-gray-500 mt-1 leading-relaxed">{cmd.description}</p>
                  </div>
                  <span className="text-gray-500 text-[13px] shrink-0 mt-0.5">{isOpen ? '−' : '+'}</span>
                </div>
              </button>

              {/* Expanded */}
              {isOpen && (
                <div className="border-t border-gray-200 px-3 pb-3 space-y-3">
                  <p className="text-[12px] text-gray-700 leading-relaxed pt-3">{cmd.longDescription}</p>

                  {cmd.prereqs && cmd.prereqs.length > 0 && (
                    <div>
                      <div className="text-[9.5px] font-semibold text-info-600 uppercase tracking-wider mb-1.5">Prerequisites</div>
                      <ul className="space-y-1">
                        {cmd.prereqs.map((p) => (
                          <li key={p} className="text-[11.5px] text-gray-700 flex items-center gap-2">
                            <span className="text-info-600">✓</span> {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div>
                    <div className="text-[9.5px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Parameters</div>
                    <ParamsTable params={cmd.params} />
                  </div>

                  <div>
                    <div className="text-[9.5px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Returns</div>
                    <ReturnsTable returns={cmd.returns} />
                  </div>

                  <div>
                    <div className="text-[9.5px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Code Example</div>
                    <CodeBlock code={cmd.codeExample} label="TypeScript" />
                  </div>

                  <div>
                    <div className="text-[9.5px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">LLM Prompt</div>
                    <div className="bg-gray-50 border border-gray-200 rounded-md p-2.5 relative">
                      <button
                        onClick={async () => {
                          await navigator.clipboard.writeText(cmd.llmPrompt)
                          toast.success('Prompt copied')
                        }}
                        className="absolute top-2 right-2 text-[10.5px] font-semibold text-info-600 bg-gray-0 border border-gray-200 px-1.5 py-0.5 rounded hover:bg-info-100 transition-colors"
                      >
                        Copy prompt
                      </button>
                      <pre className="text-[11.5px] text-gray-700 leading-relaxed whitespace-pre-wrap pr-20">{cmd.llmPrompt}</pre>
                    </div>
                  </div>

                  {cmd.errorCodes && cmd.errorCodes.length > 0 && (
                    <div>
                      <div className="text-[9.5px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Error Codes</div>
                      <div className="flex flex-wrap gap-1.5">
                        {cmd.errorCodes.map((e) => (
                          <code key={e} className="text-[10.5px] bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded font-mono">
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
