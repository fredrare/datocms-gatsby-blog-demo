import * as React from "react"
import { Link } from "gatsby"

// styles
const pageStyles = {
  color: "#232129",
  padding: "96px",
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
}
const headingStyles = {
  marginTop: 0,
  marginBottom: 64,
  maxWidth: 320,
}

const paragraphStyles = {
  marginBottom: 48,
}
const codeStyles = {
  color: "#8A6534",
  padding: 4,
  backgroundColor: "#FFF4DB",
  fontSize: "1.25rem",
  borderRadius: 4,
}

// markup
const NotFoundPage = () => {
  return (
    <main style={pageStyles}>
      <title>Página no encontrada</title>
      <h1 style={headingStyles}>Página no encontrada</h1>
      <p style={paragraphStyles}>
        ¡Ups! {" "}
        <span role="img" aria-label="Scared emoji">
          😱
        </span>{" "}
        Por razones desconocidas, no he podido encontrar esta página...
        <br />
        {process.env.NODE_ENV === "development" ? (
          <>
            <br />
            Puedes crear esta página en <code style={codeStyles}>src/pages/</code>.
            <br />
          </>
        ) : null}
        <br />
        <Link to="/">Regresa al inicio</Link>.
      </p>
    </main>
  )
}

export default NotFoundPage
