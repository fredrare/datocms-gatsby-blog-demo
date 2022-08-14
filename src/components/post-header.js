import React from "react";
import Avatar from "../components/avatar";
import Date from "../components/date";
import CoverImage from "../components/cover-image";
import PostTitle from "../components/post-title";
import { Calendar } from "./icons";

export default function PostHeader({ title, coverImage, date, author }) {
  return (
    <div className="max-w-4xl mx-auto">
      <PostTitle>{title}</PostTitle>
      <div className="hidden md:block md:mb-12">
        <Avatar name={author.name} picture={author.picture} />
      </div>
      <div className="mb-8 md:mb-16 mx-auto rounded-lg overflow-hidden border-white shadow-solid-md">
        <CoverImage title={title} image={coverImage} />
      </div>
      <div className="max-w-4xl mx-auto">
        <div className="block md:hidden mb-6">
          <Avatar name={author.name} picture={author.picture} />
        </div>
        <div className="mb-6 text-lg flex flex-row gap-2 items-center">
          <Calendar />
          <Date dateString={date} />
        </div>
      </div>
    </div>
  );
}
