import {useCallback, useSyncExternalStore} from 'react'

/**
 * Replaces the abandoned `react-media` package.
 *
 * Matches react-media's SSR behaviour: the server snapshot is always `false`,
 * so media-gated UI is absent from the HTML and appears after hydration.
 */
export function useMediaQuery(query) {
  const subscribe = useCallback(
    (onStoreChange) => {
      const mql = window.matchMedia(query)
      mql.addEventListener('change', onStoreChange)
      return () => mql.removeEventListener('change', onStoreChange)
    },
    [query]
  )

  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query])
  const getServerSnapshot = useCallback(() => false, [])

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

export default useMediaQuery
