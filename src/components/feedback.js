import React from "react"
import { Comments, Reactions } from "./icons"

const Feedback = ({ commentNumber, reactionNumber }) => (
  <div className="flex gap-2 scale-75">
    {commentNumber > 0 && (
      <div className="flex items-center">
        <span>{commentNumber}</span>
        <Comments />
      </div>
    )}
    {reactionNumber > 0 && (
      <div className="flex items-center">
        <span>{reactionNumber}</span>
        <Reactions />
      </div>
    )}
  </div>
)

export default Feedback
