import type { Metadata } from 'next'
import { GUIDE_SECTIONS } from '@/data/guide'
import { GuideContent } from '@/components/guide/GuideContent'

export const metadata: Metadata = {
  title: 'Implementation Guide — World Dev Dashboard',
  description: 'Step-by-step guide to implementing MiniKit, payments, authentication, and notifications.',
}

export default function GuidePage() {
  return (
    <div className="max-w-[1200px]">
      <GuideContent sections={GUIDE_SECTIONS} />
    </div>
  )
}
