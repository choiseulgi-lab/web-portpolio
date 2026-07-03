import { useState, useRef, useCallback } from 'react'

export function useInView(threshold = 0.15) {
  const [inView, setInView] = useState(false)
  const observerRef = useRef(null)

  const ref = useCallback((el) => {
    if (observerRef.current) observerRef.current.disconnect()
    if (!el) return
    observerRef.current = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold }
    )
    observerRef.current.observe(el)
  }, [threshold])

  return [ref, inView]
}
