import React from "react";

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
);

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
);
