'use client'

import dynamic from 'next/dynamic'

const LenisProvider = dynamic(() => import('./LenisProvider').then(m => ({ default: m.LenisProvider })), { ssr: false })
const FloatingCTA = dynamic(() => import('./FloatingCTA').then(m => ({ default: m.FloatingCTA })), { ssr: false })

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <LenisProvider>
      {children}
      <FloatingCTA />
    </LenisProvider>
  )
}
