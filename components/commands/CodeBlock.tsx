'use client'

import { useState } from 'react'
import { toast } from 'sonner'

interface Props {
  code: string
  label?: string
}

export function CodeBlock({ code, label }: Props) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      toast.success('Copied to clipboard')
      setTimeout(() => setCopied(false), 1500)
    } catch {
      toast.error('Copy failed')
    }
  }

  return (
    <div className="rounded-md overflow-hidden border border-[#2D2C2C]">
      {label ? (
        <div className="bg-[#2D2C2C] px-3 py-1.5 text-[11px] text-[#9D9B96] font-medium flex justify-between items-center">
          <span>{label}</span>
          <button
            onClick={handleCopy}
            className="text-[11px] font-semibold text-[#3DA8FC] hover:text-[#9DD4FD] transition-colors ml-4"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      ) : null}
      <div className="relative">
        {!label && (
          <button
            onClick={handleCopy}
            className="absolute top-2 right-2 z-10 text-[11px] font-semibold text-[#3DA8FC] bg-[#1a1a1a] px-2 py-0.5 rounded"
          >
            {copied ? '✓' : 'Copy'}
          </button>
        )}
        <pre className="bg-[#121212] text-[#CECDCA] px-4 py-3 text-[11.5px] font-mono leading-[1.7] overflow-x-auto whitespace-pre">
          {code}
        </pre>
      </div>
    </div>
  )
}
