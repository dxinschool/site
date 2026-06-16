import { Component } from "react"

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught:", error, info)
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          padding: 40,
          fontFamily: '"Caveat", sans-serif',
          fontSize: 28,
          color: "#0f252f",
          background: "#cad8dd",
          textAlign: "center",
        }}>
          <div style={{
            background: "rgba(255,255,255,0.7)",
            border: "1px solid rgba(47,127,176,0.45)",
            borderRadius: 4,
            padding: "32px 40px",
            maxWidth: 500,
            boxShadow: "0 16px 30px rgba(15,37,47,0.25)",
          }}>
            <h1 style={{
              fontFamily: '"VT323", monospace',
              fontSize: 36,
              color: "#1e5f86",
              margin: "0 0 12px",
            }}>
              something went wrong
            </h1>
            <p style={{ color: "#3d5c6b", margin: "0 0 16px", fontSize: 22 }}>
              {this.state.error?.message || "unknown error"}
            </p>
            <button
              onClick={() => {
                this.setState({ error: null })
                window.location.reload()
              }}
              style={{
                padding: "8px 24px",
                border: "1px solid rgba(47,127,176,0.45)",
                borderRadius: 4,
                background: "rgba(47,127,176,0.1)",
                fontFamily: '"VT323", monospace',
                fontSize: 22,
                cursor: "pointer",
                color: "#2f7fb0",
              }}
            >
              reload
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
