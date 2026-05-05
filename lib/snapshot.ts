import fs from 'fs'
import path from 'path'
import type { WorldApp } from '@/types'

const SNAPSHOT_PATH = path.join(process.cwd(), 'data', 'app-snapshot.json')

export interface Snapshot {
  date: string                         // 'YYYY-MM-DD'
  app_ids: string[]
  first_seen: Record<string, string>   // app_id → 'YYYY-MM-DD'
}

function today(): string {
  return new Date().toISOString().split('T')[0]
}

export function loadSnapshot(): Snapshot {
  try {
    const raw = fs.readFileSync(SNAPSHOT_PATH, 'utf-8')
    return JSON.parse(raw) as Snapshot
  } catch {
    return { date: '', app_ids: [], first_seen: {} }
  }
}

export async function saveSnapshot(apps: WorldApp[]): Promise<void> {
  try {
    const existing = loadSnapshot()
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

    await fs.promises.writeFile(SNAPSHOT_PATH, JSON.stringify(snapshot, null, 2))
  } catch {
    // Silently fail on read-only filesystems (Vercel, etc.)
  }
}

/** Apps present in current list but NOT in the previous snapshot */
export function getNewApps(apps: WorldApp[]): WorldApp[] {
  const snapshot = loadSnapshot()
  if (!snapshot.app_ids.length) return []
  const prevIds = new Set(snapshot.app_ids)
  return apps.filter((a) => !prevIds.has(a.app_id))
}

/** Apps sorted by first_seen ascending (oldest first), limited to n.
 *  Falls back to lowest unique_users when snapshot has no history. */
export function getOldestApps(apps: WorldApp[], n: number): WorldApp[] {
  const snapshot = loadSnapshot()
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
