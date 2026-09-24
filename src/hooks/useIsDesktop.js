'use client'

import { useState, useEffect } from 'react'

export function useIsDesktop() {
    const [isDesktop, setIsDesktop] = useState(false)

    useEffect(() => {
        const mediaQuery = window.matchMedia('(min-width: 1024px)')

        const handleChange = (e) => setIsDesktop(e.matches)
        setIsDesktop(mediaQuery.matches)

        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener('change', handleChange)
            return () => mediaQuery.removeEventListener('change', handleChange)
        } else {
            mediaQuery.addListener(handleChange)
            return () => mediaQuery.removeListener(handleChange)
        }
    }, [])

    return isDesktop
}