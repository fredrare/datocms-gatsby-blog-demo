import React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

export default function Avatar({ name, picture }) {
  return (
    <div className="flex items-center">
      <GatsbyImage
        className="w-12 h-12 rounded-full mr-4"
        image={getImage(picture)}
        alt={picture.alt}
        title={picture.title}
      />
      <div className="text-xl font-bold">{name}</div>
    </div>
  );
}
