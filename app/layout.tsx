import type { Metadata } from 'next'
import { fetchAppsSafe } from '@/lib/api'
import { COMMANDS } from '@/data/commands'
import { GUIDE_SECTIONS } from '@/data/guide'
import { Toaster } from '@/components/ui/sonner'
import { AppSidebar } from '@/components/layout/AppSidebar'
import { CommandPalette } from '@/components/layout/CommandPalette'
import { TopBar } from '@/components/layout/TopBar'
import '@worldcoin/mini-apps-ui-kit-react/styles.css'
import './globals.css'

export const metadata: Metadata = {
  title: 'World Dev Dashboard',
  description: 'Live ecosystem data and SDK reference for World App Mini-Apps developers.',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const appsResult = await fetchAppsSafe()

  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen bg-background">
          <AppSidebar />
          <div className="flex flex-1 flex-col overflow-hidden">
            <TopBar
              paletteTrigger={
                <CommandPalette apps={appsResult.apps} commands={COMMANDS} sections={GUIDE_SECTIONS} />
              }
            />
            <main className="flex-1 overflow-y-auto p-3 lg:p-4">{children}</main>
          </div>
        </div>
        <Toaster />
      </body>
    </html>
  )
}
