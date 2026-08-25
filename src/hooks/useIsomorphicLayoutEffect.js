import {useEffect, useLayoutEffect} from "react"

/**
 * `useLayoutEffect` on the client, `useEffect` on the server (where React
 * warns that layout effects do nothing).
 *
 * GSAP setup must run in a layout effect, not a passive one. ScrollTrigger's
 * `pin: true` wraps the pinned element in a `pin-spacer` element that React
 * knows nothing about. Passive effect cleanups run *after* React has removed
 * DOM nodes, so `ctx.revert()` would unwrap the spacer too late: React calls
 * removeChild against a parent that is no longer the node's real parent, the
 * commit throws, and the whole tree unmounts — a blank page on navigation
 * that only a refresh clears.
 *
 * Layout effect cleanups run synchronously during the commit, before the
 * removal, so the DOM is handed back to React exactly as it was.
 */
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect

export default useIsomorphicLayoutEffect
