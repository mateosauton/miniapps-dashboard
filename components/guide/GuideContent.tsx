'use client'

import { useState } from 'react'
import { CodeBlock } from '@/components/commands/CodeBlock'
import type { GuideSection } from '@/types'

interface Props {
  sections: GuideSection[]
  initialSectionId?: string
}

const SEV_STYLES: Record<string, string> = {
  critical:    'bg-[#121212] border-[#2D2C2C]',
  important:   'bg-[#f9f9f8] border-[#CECDCA]',
  recommended: 'bg-[#EBF5FF] border-[#9DD4FD]',
}
const SEV_BADGE: Record<string, string> = {
  critical:    'bg-white text-[#121212]',
  important:   'bg-[#121212] text-white',
  recommended: 'bg-[#007CFB] text-white',
}
const SEV_TEXT: Record<string, string> = {
  critical:    'text-[#f9f9f8]',
  important:   'text-[#373635]',
  recommended: 'text-[#2D2C2C]',
}

function SectionBody({ section }: { section: GuideSection }) {
  if (section.steps) {
    return (
      <div className="space-y-5 pt-4">
        {section.steps.map((step) => (
          <div key={step.n} className="flex gap-3 items-start">
            <span className="w-6 h-6 rounded-full bg-[#121212] text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
              {step.n}
            </span>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-[13px] text-[#121212] mb-1">{step.title}</div>
              {step.text && <div className="text-[12.5px] text-[#9D9B96] mb-2 leading-relaxed">{step.text}</div>}
              {step.code && <CodeBlock code={step.code} />}
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (section.items) {
    return (
      <div className="space-y-2 pt-4">
        {section.items.map((item) => (
          <div
            key={item.title}
            className={`flex gap-3 items-start p-3 rounded-md border ${SEV_STYLES[item.sev] ?? ''}`}
          >
            <span className={`text-[11px] font-semibold px-2 py-0.5 rounded shrink-0 capitalize ${SEV_BADGE[item.sev] ?? ''}`}>
              {item.sev}
            </span>
            <div>
              <div className={`font-semibold text-[12.5px] mb-0.5 ${SEV_TEXT[item.sev] ?? 'text-[#121212]'}`}>{item.title}</div>
              <div className={`text-[12px] leading-relaxed ${item.sev === 'critical' ? 'text-[#CECDCA]' : 'text-[#9D9B96]'}`}>{item.text}</div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (section.metrics) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 pt-4">
        {section.metrics.map((m) => (
          <div key={m.label} className="bg-[#f9f9f8] border border-[#e1dfda] rounded-lg p-3 text-center">
            <div className="text-[22px] font-semibold text-[#121212]">{m.val}</div>
            <div className="text-[12px] font-semibold text-[#373635] mt-1">{m.label}</div>
            <div className="text-[11px] text-[#9D9B96] mt-0.5">{m.note}</div>
          </div>
        ))}
      </div>
    )
  }

  return null
}

export function GuideContent({ sections, initialSectionId }: Props) {
  const defaultOpen = sections.some((section) => section.id === initialSectionId)
    ? initialSectionId ?? null
    : sections[0]?.id ?? null
  const [open, setOpen] = useState<string | null>(defaultOpen)

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-semibold text-[24px] text-[#121212]">Implementation Guide</h1>
        <p className="text-[12.5px] text-[#9D9B96] mt-1">
          Step-by-step developer reference for MiniKit, payments, authentication, and notifications.
        </p>
      </div>

      <div className="flex gap-6">
        {/* Sticky section nav */}
        <aside className="hidden xl:block w-52 shrink-0">
          <div className="sticky top-4 space-y-0.5">
            <div className="text-[10.5px] font-semibold text-[#9D9B96] uppercase tracking-wider mb-2">Sections</div>
            {sections.map((s, i) => (
              <button
                key={s.id}
                onClick={() => {
                  setOpen(s.id)
                  document.getElementById(`gsec-${s.id}`)?.scrollIntoView({ behavior: 'smooth' })
                }}
                className={`w-full text-left px-2.5 py-1.5 rounded text-[12px] transition-colors ${
                  open === s.id ? 'bg-[#EBF5FF] text-[#007CFB] font-medium' : 'text-[#9D9B96] hover:text-[#121212] hover:bg-[#f9f9f8]'
                }`}
              >
                {i + 1}. {s.title}
              </button>
            ))}
          </div>
        </aside>

        {/* Accordion */}
        <div className="flex-1 min-w-0 space-y-2">
          {sections.map((s) => {
            const isOpen = open === s.id
            return (
              <div key={s.id} id={`gsec-${s.id}`}>
                <h2>
                  <button
                    onClick={() => setOpen(isOpen ? null : s.id)}
                    className="w-full flex justify-between items-center px-4 py-3.5 bg-white border border-[#CECDCA] rounded-lg hover:bg-[#f9f9f8] transition-colors text-left"
                    style={{ borderRadius: isOpen ? '8px 8px 0 0' : undefined, borderBottom: isOpen ? 'none' : undefined }}
                  >
                    <span className="font-semibold text-[14px] text-[#121212]">{s.title}</span>
                    <span className="text-[#9D9B96] text-[16px] ml-3">{isOpen ? '−' : '+'}</span>
                  </button>
                </h2>
                {isOpen && (
                  <div className="bg-white border border-[#CECDCA] border-t-0 rounded-b-lg px-4 pb-4">
                    <SectionBody section={s} />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
