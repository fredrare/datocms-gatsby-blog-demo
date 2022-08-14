import React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { Link } from "gatsby";

export default function CoverImage({ title, image, slug }) {
  const imageElement = (
    <GatsbyImage image={getImage(image)} alt={`Portada del post ${title}`} title={title} />
  );
  return (
    <div>
      {slug ? (
        <Link to={`/posts/${slug}`} aria-label={title} title={title}>
          {imageElement}
        </Link>
      ) : (
        imageElement
      )}
    </div>
  );
}
