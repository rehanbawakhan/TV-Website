'use client'

import React from 'react'
import { Providers } from './Providers'

// Minimal client wrapper used by the root layout. Keep this intentionally small
// to avoid importing many client-only components here; expand later if needed.
export default function ClientRoot({ children }: { children: React.ReactNode }) {
  return <Providers>{children}</Providers>
}
