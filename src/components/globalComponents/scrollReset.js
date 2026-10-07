import useIsomorphicLayoutEffect from "../../hooks/useIsomorphicLayoutEffect"

/**
 * Puts the window back at the top before the page that follows sets up its
 * scroll animations.
 *
 * Every page already scrolls to the top in a `useEffect`, and Gatsby does the
 * same once the route has changed — but both run after the page's layout
 * effects, which is where GSAP builds its ScrollTriggers. Arriving from a page
 * read halfway down, the new page's triggers were created at the old scroll
 * position: every `once` reveal it had already passed fired there and then,
 * off screen, so the facts, the first case-study sections and their images
 * were simply in place when the reader got to them.
 *
 * Rendered in Layout ahead of the page and keyed by path, so it mounts again
 * on every navigation and its layout effect runs before the page's own.
 */
const ScrollReset = () => {
  useIsomorphicLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return null
}

export default ScrollReset
