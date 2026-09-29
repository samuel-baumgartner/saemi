import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { UniShell } from '@/components/uni/UniShell'

export const metadata: Metadata = { title: 'Uni' }

export default async function UniLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session?.user) redirect('/personal')
  return <UniShell>{children}</UniShell>
}
