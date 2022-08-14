import React from "react";
import { Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { siteName } from "../common/strings";

export default function Footer({ socialMedia }) {
  return (
    <footer className="w-full px-3 py-5 bg-gray-100 items-center">
      <div className="px-4 mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-center md:justify-between content-center">
        <div className="flex justify-start gap-4">
          <Link to="/" title={siteName}>
            {siteName}
          </Link>
          {" (Derechos reservados - 2021)"}
        </div>
        <div className="items-center flex flex-row">
          <ul className="flex flex-row list-none ml-auto">
            {socialMedia.map(platformImage => (
              <li className="flex items-center py-2" key={platformImage.title}>
                <a
                  href={platformImage.customData.link}
                  title={platformImage.title}
                  className="px-3 py-2 hover:opacity-75"
                >
                  <GatsbyImage
                    alt={platformImage.alt}
                    className="content-center"
                    image={getImage(platformImage.image)}
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
