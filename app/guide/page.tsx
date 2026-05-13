import type { Metadata } from 'next'
import { GUIDE_SECTIONS } from '@/data/guide'
import { GuideContent } from '@/components/guide/GuideContent'

export const metadata: Metadata = {
  title: 'Implementation Guide — World Dev Dashboard',
  description: 'Step-by-step guide to implementing MiniKit, payments, authentication, and notifications.',
}

export default async function GuidePage({
  searchParams,
}: {
  searchParams?: Promise<{ section?: string | string[] }>
}) {
  const params = await searchParams
  const initialSectionId = Array.isArray(params?.section) ? params?.section[0] : params?.section
  return (
    <div className="max-w-[1200px]">
      <GuideContent sections={GUIDE_SECTIONS} initialSectionId={initialSectionId} />
    </div>
  )
}
