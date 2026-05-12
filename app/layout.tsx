import type { Metadata } from 'next'
import { Toaster } from '@/components/ui/sonner'
import { AppSidebar } from '@/components/layout/AppSidebar'
import { TopBar } from '@/components/layout/TopBar'
import '@worldcoin/mini-apps-ui-kit-react/styles.css'
import './globals.css'

export const metadata: Metadata = {
  title: 'World Dev Dashboard',
  description: 'Live ecosystem data and SDK reference for World App Mini-Apps developers.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen bg-background">
          <AppSidebar />
          <div className="flex flex-1 flex-col overflow-hidden">
            <TopBar />
            <main className="flex-1 overflow-y-auto p-4 lg:p-6">{children}</main>
          </div>
        </div>
        <Toaster />
      </body>
    </html>
  )
}
