import React from "react"

/**
 * React routes commit-phase errors — including the ones thrown while running
 * an effect cleanup during unmount — to the nearest error boundary, together
 * with a component stack. That stack is the only thing that identifies which
 * component owns a failing effect; the raw error only points at react-dom
 * internals.
 *
 * In development the stack is rendered on the page so it cannot be missed.
 * In production the boundary just keeps a failure from blanking the site.
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = {error: null, componentStack: null}
  }

  static getDerivedStateFromError(error) {
    return {error}
  }

  componentDidCatch(error, info) {
    this.setState({componentStack: info && info.componentStack})
    // eslint-disable-next-line no-console
    console.error(
      "[ErrorBoundary] %s\nComponent stack:%s",
      error && error.message,
      (info && info.componentStack) || " (none)"
    )
  }

  render() {
    const {error, componentStack} = this.state

    if (!error) return this.props.children

    if (process.env.NODE_ENV !== "development") return null

    return (
      <pre
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 2147483647,
          margin: 0,
          padding: "2rem",
          overflow: "auto",
          background: "#1d2124",
          color: "#f8f8f8",
          font: "12px/1.5 ui-monospace, SFMono-Regular, Menlo, monospace",
          whiteSpace: "pre-wrap",
        }}
      >
        {`${error.message}\n\nComponent stack:${componentStack || " (none)"}`}
      </pre>
    )
  }
}

export default ErrorBoundary
