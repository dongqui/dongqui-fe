import { RefObject, useEffect, useState } from 'react'


interface Params extends IntersectionObserverInit {
  onIntersection: () => void;
  frozenAfterOnce?: boolean;
}

function useIntersectionObserver(
  elementRef: RefObject<Element>,
  {
    onIntersection,
    frozenAfterOnce = false,
    threshold = 0,
    root = null,
    rootMargin = '0%',
  }: Params
) {

  useEffect(() => {
    const node = elementRef?.current
    if (node) {
      const observerParams = { threshold, root, rootMargin }
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          onIntersection();
          
          if (frozenAfterOnce) {
            observer.disconnect();
          }
        }
      }, observerParams)

      observer.observe(node);
      
      return () => observer.disconnect()
    }  
  }, [elementRef, threshold, root, rootMargin, onIntersection, frozenAfterOnce])

  // return entry
}

export default useIntersectionObserver