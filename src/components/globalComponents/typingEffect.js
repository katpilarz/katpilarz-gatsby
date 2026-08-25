import React from "react"
import useTypingEffect from "../../hooks/useTypingEffect"

/**
 * Drop-in replacement for `<ReactTypingEffect />` covering the props this
 * site uses: text, speed, eraseSpeed, eraseDelay, cursorRenderer and
 * displayTextRenderer.
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

  return (
    <>
      {displayTextRenderer ? displayTextRenderer(value, 0) : value}
      {cursorRenderer ? cursorRenderer(cursor) : cursor}
    </>
  )
}

export default TypingEffect
