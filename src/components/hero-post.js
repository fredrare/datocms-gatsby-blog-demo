import React from "react";
import Avatar from "../components/avatar";
import Date from "../components/date";
import CoverImage from "../components/cover-image";
import { Link } from "gatsby";
import { Calendar } from "./icons";

export default function HeroPost({ title, coverImage, date, excerpt, author, slug }) {
  return (
    <section className="flex flex-col justify-center items-center w-full pb-8">
      <h2 className="mb-8 w-full text-left text-6xl md:text-6xl font-bold tracking-tighter leading-tight">
        Última publicación
      </h2>
      <div className="max-w-md lg:max-w-full w-full bg-white rounded-lg overflow-hidden shadow-solid-md hover:shadow-solid-lg focus-within:shaadow-solid-lg transform-gpu duration-200 hover:-translate-x-1 focus-within:-translate-y-1 hover:-translate-y-1 focus-within:-translate-x-1 flex flex-col items-center justify-between lg:flex-row">
        <div className="border-b lg:border-b-0 lg:border-r xl:rounded-lg overflow-hidden w-full h-full">
          <CoverImage slug={slug} title={title} fluid={coverImage.small} />
        </div>
        <div className="p-4 flex flex-col justify-between">
          <h3 className="text-3xl mb-3 leading-snug">
            <Link to={`/posts/${slug}`} className="hover:underline">
              {title}
            </Link>
          </h3>
          <div className="text-lg mb-4 flex flex-row gap-2 items-center">
            <Calendar /> <Date dateString={date} />
          </div>
          <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
          <Avatar name={author.name} picture={author.picture} />
        </div>
      </div>
    </section>
  );
}
