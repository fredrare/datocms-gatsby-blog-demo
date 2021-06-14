import React from "react";

export default function PostTitle({ children }) {
  return (
    <h2  className="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight">
      {children}
    </h2>
  )
}
