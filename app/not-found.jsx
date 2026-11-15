'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import StandaloneShell from '../components/StandaloneShell'
import NotFoundView from '../components/NotFoundView'

// Unknown routes land here. It sits outside the (site) route group, so
// it borrows the chrome through StandaloneShell and skips the loader —
// there is no reason to make a 404 wait behind an intro animation.
//
// A client component only for `usePathname`, so the page can echo the
// address that was not found instead of the generic fallback.
export default function NotFound() {
  const pathname = usePathname()

  // The 404 shell is prerendered without a pathname, so echoing the
  // path on the first client render would break hydration. Show the
  // generic fallback first, then swap in the real path after mount.
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <StandaloneShell>
      <NotFoundView requestedPath={mounted ? pathname : null} />
    </StandaloneShell>
  )
}
