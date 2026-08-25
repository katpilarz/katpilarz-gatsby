import {useEffect, useMemo, useRef, useState} from "react"
import {useMediaQuery} from "./useMediaQuery"

/**
 * Replaces the abandoned `react-typing-effect`. Cycles through a list of
 * strings, typing and erasing each one.
 *
 * Honours `prefers-reduced-motion`: readers who ask for less motion get the
 * first string rendered statically, with no cursor animation.
 */
export default function useTypingEffect(
  texts,
  {speed = 100, eraseSpeed = 100, eraseDelay = 1000, typingDelay = 500} = {}
) {
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)")

  const key = Array.isArray(texts) ? texts.join(" ") : texts
  const list = useMemo(
    () => (Array.isArray(texts) ? texts.filter(Boolean) : texts ? [texts] : []),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [key]
  )

  const [index, setIndex] = useState(0)
  const [charCount, setCharCount] = useState(0)
  const [erasing, setErasing] = useState(false)
  const [cursorOn, setCursorOn] = useState(true)

  const current = list.length ? list[index % list.length] : ""
  const stateRef = useRef({charCount, erasing})
  stateRef.current = {charCount, erasing}

  useEffect(() => {
    if (!list.length || reduceMotion) return undefined

    const {charCount: count, erasing: isErasing} = stateRef.current
    let delay
    if (!isErasing) delay = count < current.length ? speed : eraseDelay
    else delay = count > 0 ? eraseSpeed : typingDelay

    const timer = setTimeout(() => {
      if (!isErasing) {
        if (count < current.length) setCharCount(count + 1)
        else setErasing(true)
      } else if (count > 0) {
        setCharCount(count - 1)
      } else {
        setErasing(false)
        setIndex((i) => (i + 1) % list.length)
      }
    }, delay)

    return () => clearTimeout(timer)
  }, [
    charCount,
    erasing,
    index,
    current,
    list.length,
    speed,
    eraseSpeed,
    eraseDelay,
    typingDelay,
    reduceMotion,
  ])

  useEffect(() => {
    if (reduceMotion) return undefined
    const blink = setInterval(() => setCursorOn((on) => !on), 500)
    return () => clearInterval(blink)
  }, [reduceMotion])

  if (reduceMotion) {
    return {value: list[0] || "", cursor: ""}
  }

  return {value: current.slice(0, charCount), cursor: cursorOn ? "|" : " "}
}
