import { RefObject, useEffect, useState } from 'react'


function useIntersectionObserver(
  elementRef: RefObject<Element>,
  {
    threshold = 0,
    root = null,
    rootMargin = '0%',
  }: Partial<IntersectionObserverInit>,
): IntersectionObserverEntry | undefined {
  const [entry, setEntry] = useState<IntersectionObserverEntry>()

  useEffect(() => {
    const node = elementRef?.current
    if (node) {
      const observerParams = { threshold, root, rootMargin }
      const observer = new IntersectionObserver(([entry]) => setEntry(entry), observerParams)

      observer.observe(node);
      
      return () => observer.disconnect()
    }  
  }, [elementRef, threshold, root, rootMargin])

  return entry
}

export default useIntersectionObserver