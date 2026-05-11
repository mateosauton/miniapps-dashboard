import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { CommandCategory, CommandSDK } from '@/types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ── World brand color tokens ────────────────────────────────────────────────────
// Primary: #007CFB (blue) + grey scale
// Tones: dark=#005BC4, mid=#3DA8FC, muted=#9DD4FD, light=#EBF5FF

export const commandCategoryColors: Record<CommandCategory, string> = {
  auth:          'bg-[#EBF5FF] text-[#005BC4]',
  payments:      'bg-[#e1dfda] text-[#2D2C2C]',
  signing:       'bg-[#D6EAFF] text-[#005BC4]',
  messaging:     'bg-[#e1dfda] text-[#373635]',
  permissions:   'bg-[#EBF5FF] text-[#007CFB]',
  notifications: 'bg-[#2D2C2C] text-[#f9f9f8]',
  ux:            'bg-[#D6EAFF] text-[#3DA8FC]',
}

export const sdkColors: Record<CommandSDK, string> = {
  minikit:   'bg-[#121212] text-white',
  idkit:     'bg-[#007CFB] text-white',
  agentkit:  'bg-[#005BC4] text-white',
}

export const appCategoryColors: Record<string, string> = {
  Tokens:   'bg-[#EBF5FF] text-[#005BC4]',
  Finance:  'bg-[#e1dfda] text-[#2D2C2C]',
  Gaming:   'bg-[#D6EAFF] text-[#007CFB]',
  Earn:     'bg-[#EBF5FF] text-[#3DA8FC]',
  Business: 'bg-[#e1dfda] text-[#373635]',
  Other:    'bg-[#f9f9f8] text-[#9D9B96]',
}

export const categoryBarColors: Record<string, string> = {
  Tokens:   '#007CFB',
  Finance:  '#9D9B96',
  Gaming:   '#005BC4',
  Earn:     '#3DA8FC',
  Business: '#CECDCA',
  Other:    '#e1dfda',
}

// ── Formatters ────────────────────────────────────────────────────────────────
export function fmtNum(n: number): string {
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}B`
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`
  return n.toString()
}
