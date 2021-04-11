import React from "react";
import { siteName } from '../common/strings'

export default function Intro() {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
        { siteName }
      </h1>
      <h4 className="text-center md:text-left text-lg mt-5 md:pl-8">
        No es la web de mis sueños.
      </h4>
    </section>
  )
}
