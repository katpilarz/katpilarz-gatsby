import React from "react"
import {PortableText as BasePortableText} from "@portabletext/react"

/**
 * Replaces the unmaintained `react-portable-text` with the official
 * `@portabletext/react`. Keeps the old `content` / `className` prop names so
 * call sites only had to change their import.
 */

const projectId = process.env.GATSBY_SANITY_PROJECT_ID
const dataset = process.env.GATSBY_SANITY_DATASET

// "image-<id>-<width>x<height>-<ext>" -> a cdn.sanity.io URL.
const urlFromRef = (ref) => {
  if (!ref || !projectId || !dataset) return null
  const [, id, dimensions, format] = ref.split("-")
  if (!id || !dimensions || !format) return null
  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${dimensions}.${format}`
}

const components = {
  types: {
    figure: ({value}) => {
      const url = urlFromRef(value?.asset?._ref)
      if (!url) return null
      return (
        <figure>
          <img src={url} alt={value.alt || ""} loading="lazy" />
          {value.caption && <figcaption>{value.caption}</figcaption>}
        </figure>
      )
    },
  },
  marks: {
    link: ({value, children}) => (
      <a href={value?.href} rel="noopener noreferrer" target="_blank">
        {children}
      </a>
    ),
  },
}

const PortableText = ({content, className}) => {
  if (!content) return null

  const body = <BasePortableText value={content} components={components} />

  return className ? <div className={className}>{body}</div> : body
}

export default PortableText
