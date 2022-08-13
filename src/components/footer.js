import React from "react";
import { Link } from "gatsby";
import Image from "gatsby-image";
import { siteName } from "../common/strings";

export default function Footer({ socialMedia }) {
  return (
    <footer className="w-full justify-between px-3 py-5 bg-gray-100 items-center">
      <div className="px-4 mx-auto flex flex-wrap items-center justify-between content-center">
        <div className="w-full relative flex justify-between lg:w-auto px-4 lg:static lg:block lg:justify-start">
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
                  <Image
                    className="content-center"
                    fixed={platformImage.fixed}
                    alt={platformImage.alt}
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
