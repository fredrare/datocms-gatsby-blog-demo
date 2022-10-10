import React, { useState, useEffect } from "react"
import Giscus from "@giscus/react"

const Comments = () => {
  const [theme, setTheme] = useState("light_protanopia")
  useEffect(() => {
    setTheme(document.location.origin + "/css/comments-0.1.css")
  }, [])
  return (
    <section className="max-w-3xl mx-auto py-8">
      <div className="px-6 py-4 rounded-lg overflow-hidden bg-white border-white shadow-solid-md">
        <Giscus
          id="comments"
          repo="fredrare/blog-interactions"
          repoId="R_kgDOILnYCA"
          category="Announcements"
          categoryId="DIC_kwDOILnYCM4CR5wD"
          mapping="og:title"
          term="Welcome to @giscus/react component!"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="top"
          theme={theme}
          lang="es"
          loading="lazy"
          crossorigin="anonymous"
          strict="0"
        />
      </div>
    </section>
  )
}

export default Comments
