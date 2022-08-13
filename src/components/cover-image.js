import React from "react";
import Image from "gatsby-image";
import { Link } from "gatsby";

export default function CoverImage({ title, fluid, slug }) {
  const image = (
    <Image
      fluid={{
        ...fluid,
        alt: `Cover Image for ${title}`,
      }}
    />
  );
  return (
    <div>
      {slug ? (
        <Link to={`/posts/${slug}`} aria-label={title} title={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  );
}
