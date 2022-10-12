import React, { useState, useEffect } from "react"

const useFeedback = commentSource => {
  const [commentNumber, setCommentNumber] = useState(0)
  const [reactionNumber, setReactionNumber] = useState(0)
  useEffect(() => {
    fetch(
      "https://api.allorigins.win/raw?url=" +
        encodeURIComponent(
          "https://giscus.app/api/discussions?repo=fredrare/blog-interactions&category=Announcements&number=0&strict=false&term=" +
            commentSource
        )
    )
      .then(resp => resp.json())
      .then(data => {
        setCommentNumber(data?.discussion?.totalCommentCount || 0)
        setReactionNumber(data?.discussion?.reactionCount || 0)
      })
  }, [])

  return { commentNumber, reactionNumber }
}

export default useFeedback
