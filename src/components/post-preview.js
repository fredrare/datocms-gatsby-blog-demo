import React from "react";
import Avatar from "../components/avatar";
import Date from "../components/date";
import CoverImage from "./cover-image";
import { Link } from "gatsby";
import { Calendar } from "./icons";

export default function PostPreview({ title, coverImage, date, excerpt, author, slug }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-solid-md hover:shadow-solid-lg focus-within:shaadow-solid-lg transform-gpu duration-200 hover:-translate-x-1 focus-within:-translate-y-1 hover:-translate-y-1 focus-within:-translate-x-1">
      <div className="border-b">
        <CoverImage slug={slug} title={title} image={coverImage} />
      </div>
      <div className="p-4 md:p-6 flex flex-col justify-between gap-2">
        <h3 className="text-3xl leading-snug">
          <Link to={`/posts/${slug}`} className="hover:underline focus:underline">
            {title}
          </Link>
        </h3>
        <p className="text-lg leading-relaxed">{excerpt}</p>
        <Avatar name={author.name} picture={author.picture} />
        <div className="text-lg flex flex-row gap-2 items-center">
          <Calendar />
          <Date dateString={date} />
        </div>
      </div>
    </div>
  );
}
