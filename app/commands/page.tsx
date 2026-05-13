import type { Metadata } from 'next'
import { COMMANDS } from '@/data/commands'
import { CommandGrid } from '@/components/commands/CommandGrid'

export const metadata: Metadata = {
  title: 'SDK Commands — World Dev Dashboard',
  description: 'Full reference for MiniKit, IDKit, and AgentKit commands with params, code examples, and LLM prompts.',
}

export default async function CommandsPage({
  searchParams,
}: {
  searchParams?: Promise<{ command?: string | string[] }>
}) {
  const params = await searchParams
  const initialCommandSlug = Array.isArray(params?.command) ? params?.command[0] : params?.command
  return (
    <div className="max-w-[1400px]">
      <CommandGrid commands={COMMANDS} initialCommandSlug={initialCommandSlug} />
    </div>
  )
}
