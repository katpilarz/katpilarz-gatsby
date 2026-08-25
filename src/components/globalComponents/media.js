import {useMediaQuery} from "../../hooks/useMediaQuery"

/**
 * Drop-in replacement for the abandoned `react-media` package, covering the
 * two call shapes this site uses:
 *
 *   <Media query="(min-width: 569px)" render={() => <Thing />} />
 *   <Media query="(min-width: 569px)">{matches => matches && <Thing />}</Media>
 *
 * Like react-media, nothing renders on the server — the match is resolved
 * after hydration.
 */
const Media = ({query, render, children}) => {
  const matches = useMediaQuery(query)

  if (typeof children === "function") return children(matches)
  if (!matches) return null
  if (render) return render()

  return children ?? null
}

export default Media
