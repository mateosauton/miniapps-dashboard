import fs from 'fs'
import path from 'path'
import { kv } from '@vercel/kv'
import type { WorldApp } from '@/types'

const SNAPSHOT_PATH = path.join(process.cwd(), 'data', 'app-snapshot.json')
const SNAPSHOT_KEY = process.env.APP_SNAPSHOT_KV_KEY ?? 'miniapps-dashboard:app-snapshot'

export interface Snapshot {
  date: string
  app_ids: string[]
  first_seen: Record<string, string>
}

const EMPTY_SNAPSHOT: Snapshot = { date: '', app_ids: [], first_seen: {} }

function today(): string {
  return new Date().toISOString().split('T')[0]
}

function hasKvCredentials(): boolean {
  return Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN)
}

function normalizeSnapshot(value: unknown): Snapshot | null {
  if (!value || typeof value !== 'object') return null

  const candidate = value as Partial<Snapshot>
  if (
    typeof candidate.date !== 'string' ||
    !Array.isArray(candidate.app_ids) ||
    !candidate.first_seen ||
    typeof candidate.first_seen !== 'object'
  ) {
    return null
  }

  return {
    date: candidate.date,
    app_ids: candidate.app_ids.filter((id): id is string => typeof id === 'string'),
    first_seen: Object.fromEntries(
      Object.entries(candidate.first_seen).filter(
        (entry): entry is [string, string] => typeof entry[1] === 'string'
      )
    ),
  }
}

async function loadFileSnapshot(): Promise<Snapshot> {
  try {
    const raw = await fs.promises.readFile(SNAPSHOT_PATH, 'utf-8')
    return normalizeSnapshot(JSON.parse(raw)) ?? EMPTY_SNAPSHOT
  } catch {
    return EMPTY_SNAPSHOT
  }
}

async function saveFileSnapshot(snapshot: Snapshot): Promise<void> {
  await fs.promises.mkdir(path.dirname(SNAPSHOT_PATH), { recursive: true })
  await fs.promises.writeFile(SNAPSHOT_PATH, JSON.stringify(snapshot, null, 2))
}

async function loadKvSnapshot(): Promise<Snapshot | null> {
  if (!hasKvCredentials()) return null
  return normalizeSnapshot(await kv.get(SNAPSHOT_KEY))
}

async function saveKvSnapshot(snapshot: Snapshot): Promise<boolean> {
  if (!hasKvCredentials()) return false
  await kv.set(SNAPSHOT_KEY, snapshot)
  return true
}

export async function loadSnapshot(): Promise<Snapshot> {
  try {
    return (await loadKvSnapshot()) ?? await loadFileSnapshot()
  } catch (error) {
    console.warn('[snapshot] Failed to load from KV; falling back to local file', error)
    return loadFileSnapshot()
  }
}

export async function saveSnapshot(apps: WorldApp[]): Promise<void> {
  const existing = await loadSnapshot()
  const todayStr = today()
  const currentIds = apps.map((a) => a.app_id)

  const firstSeen: Record<string, string> = { ...existing.first_seen }
  for (const id of currentIds) {
    if (!firstSeen[id]) firstSeen[id] = todayStr
  }

  const snapshot: Snapshot = {
    date: todayStr,
    app_ids: currentIds,
    first_seen: firstSeen,
  }

  try {
    if (await saveKvSnapshot(snapshot)) return
    await saveFileSnapshot(snapshot)
  } catch (error) {
    console.warn('[snapshot] Failed to persist snapshot', error)
  }
}

/** Apps present in current list but NOT in the previous snapshot */
export async function getNewApps(apps: WorldApp[]): Promise<WorldApp[]> {
  const snapshot = await loadSnapshot()
  if (!snapshot.app_ids.length) return []
  const prevIds = new Set(snapshot.app_ids)
  return apps.filter((a) => !prevIds.has(a.app_id))
}

/** Apps sorted by first_seen ascending (oldest first), limited to n.
 *  Falls back to lowest unique_users when snapshot has no history. */
export async function getOldestApps(apps: WorldApp[], n: number): Promise<WorldApp[]> {
  const snapshot = await loadSnapshot()
  const hasHistory = Object.keys(snapshot.first_seen).length > 0

  if (hasHistory) {
    return [...apps]
      .sort((a, b) => {
        const da = snapshot.first_seen[a.app_id] ?? '9999'
        const db = snapshot.first_seen[b.app_id] ?? '9999'
        return da.localeCompare(db)
      })
      .slice(0, n)
  }

  // Fallback: use apps not in the top 10 by users (proxy for "established but overlooked")
  const sorted = [...apps].sort((a, b) => b.unique_users - a.unique_users)
  const start = Math.min(10, Math.max(0, sorted.length - 1))
  return sorted.slice(start, start + n)
}
