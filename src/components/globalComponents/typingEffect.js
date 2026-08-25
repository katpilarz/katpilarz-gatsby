import React from "react"
import * as styles from "./typingEffect.module.scss"
import useTypingEffect from "../../hooks/useTypingEffect"

/**
 * Drop-in replacement for `<ReactTypingEffect />` covering the props this
 * site uses: text, speed, eraseSpeed, eraseDelay, cursorRenderer and
 * displayTextRenderer.
 *
 * The renderers here return headings, so the box would otherwise grow and
 * shrink as characters are typed and erased. A hidden sizer holding the
 * longest state keeps the height fixed — see typingEffect.module.scss.
 */
const TypingEffect = ({
  text,
  speed,
  eraseSpeed,
  eraseDelay,
  cursorRenderer,
  displayTextRenderer,
}) => {
  const {value, cursor} = useTypingEffect(text, {speed, eraseSpeed, eraseDelay})

  const list = Array.isArray(text) ? text.filter(Boolean) : text ? [text] : []
  const longest = list.reduce((a, b) => (b.length > a.length ? b : a), "")

  const render = (v, c) => {
    const caret = cursorRenderer ? cursorRenderer(c) : c

    return (
      <>
        {displayTextRenderer ? displayTextRenderer(v, 0) : v}
        {/* The caret is decoration. Hide it from assistive tech in place,
            rather than in a wrapper, so it stays a direct child and the
            inline-flow rule in the stylesheet still applies to it. */}
        {React.isValidElement(caret)
          ? React.cloneElement(caret, {"aria-hidden": "true"})
          : caret}
      </>
    )
  }

  return (
    <div className={styles.reserve}>
      <div className={styles.sizer} aria-hidden="true">
        {render(longest, "|")}
      </div>
      <div className={styles.live}>{render(value, cursor)}</div>
    </div>
  )
}

export default TypingEffect
