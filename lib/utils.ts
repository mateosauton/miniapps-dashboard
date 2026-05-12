import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { CommandCategory, CommandSDK } from '@/types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ── Mini Apps UI Kit color tokens ──────────────────────────────────────────────
// These class names are backed by app/globals.css and the UI kit's compiled CSS.

export const commandCategoryColors: Record<CommandCategory, string> = {
  auth:          'bg-info-100 text-info-700',
  payments:      'bg-gray-100 text-gray-700',
  signing:       'bg-world-blue-secondary text-info-700',
  messaging:     'bg-gray-100 text-gray-700',
  permissions:   'bg-info-100 text-info-600',
  notifications: 'bg-gray-900 text-gray-0',
  ux:            'bg-world-blue-secondary text-info-600',
}

export const sdkColors: Record<CommandSDK, string> = {
  minikit:   'bg-gray-900 text-gray-0',
  idkit:     'bg-info-600 text-gray-0',
  agentkit:  'bg-gray-700 text-gray-0',
}

export const appCategoryColors: Record<string, string> = {
  Tokens:   'bg-info-100 text-info-700',
  Finance:  'bg-gray-100 text-gray-700',
  Gaming:   'bg-world-blue-secondary text-info-600',
  Earn:     'bg-success-100 text-success-700',
  Business: 'bg-gray-100 text-gray-700',
  Other:    'bg-gray-50 text-gray-500',
}

export const categoryBarColors: Record<string, string> = {
  Tokens:   'rgb(var(--info-600))',
  Finance:  'rgb(var(--gray-400))',
  Gaming:   'rgb(var(--world-blue-primary))',
  Earn:     'rgb(var(--success-600))',
  Business: 'rgb(var(--gray-300))',
  Other:    'rgb(var(--gray-200))',
}

// ── Formatters ────────────────────────────────────────────────────────────────
export function fmtNum(n: number): string {
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}B`
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`
  return n.toString()
}
