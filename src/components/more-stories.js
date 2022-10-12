import React from "react"
import PostPreview from "../components/post-preview"

export default function MoreStories({ posts, title }) {
  const morePosts = posts?.map(post => (
    <li key={post.slug}>
      <PostPreview
        title={post.title}
        coverImage={post.coverImage}
        date={post.date}
        author={post.author}
        slug={post.slug}
        excerpt={post.excerpt}
        commentSource={post.seoSettings?.title}
      />
    </li>
  ))
  return (
    <section className="mx-auto w-full max-w-5xl">
      <h2 className="mb-8 text-6xl md:text-6xl font-bold tracking-tighter leading-tight">
        {title || "Más publicaciones"}
      </h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32 transform-gpu duration-500">
        {morePosts?.length ? morePosts : <div>No hay publicaciones aún...</div>}
      </ul>
    </section>
  )
}
