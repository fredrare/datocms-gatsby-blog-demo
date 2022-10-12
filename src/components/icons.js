import React from "react"

export const Calendar = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
)

export const WindowControls = () => (
  <div className="flex flex-row gap-2 w-min group">
    <div className="w-max aspect-square rounded-full border-min bg-red-500 border-red-600">
      <div className="flex flex-col w-3 h-3 rounded-full border-2 border-transparent items-center justify-center">
        <div className="w-full h-1px translate-y-1/2 rotate-45 group-hover:bg-red-900 "></div>
        <div className="w-full h-1px -translate-y-1/2 -rotate-45 group-hover:bg-red-900 "></div>
      </div>
    </div>
    <div className="w-max aspect-square rounded-full border-min bg-yellow-500 border-yellow-600">
      <div className="flex flex-col w-3 h-3 rounded-full border-2 border-transparent items-center justify-center">
        <div className="w-full h-1px group-hover:bg-yellow-900 "></div>
      </div>
    </div>
    <div className="w-max aspect-square rounded-full border-min bg-green-500 border-green-600">
      <div className="flex flex-col w-3 h-3 rounded-full border-2 border-transparent items-center justify-center">
        <div className="w-full h-full group-hover:bg-green-900 flex items-center scale-75">
          <div className="w-full h-0.5 bg-green-500 -rotate-45 scale-150 rounded-lg"></div>
        </div>
      </div>
    </div>
  </div>
)

export const Comments = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
    />
  </svg>
)

export const Reactions = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
    />
  </svg>
)
