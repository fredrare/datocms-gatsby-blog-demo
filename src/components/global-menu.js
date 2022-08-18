import React, { useState } from "react";
import { Link } from "gatsby";
import { siteName } from "../common/strings";

export default function Menu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuItems = [
    { name: "Programación", url: "/categories/programming" },
    { name: "Seguridad", url: "/categories/security" },
    // {name: 'Sobre mí', url: '/about'}
  ];
  return (
    <header
      className="flex flex-wrap w-full items-center justify-center"
      style={{
        position: "absolute",
        top: 0,
      }}
    >
      <div className="w-full">
        <nav className="relative flex flex-wrap items-center justify-between py-3 bg-pink-500">
          <div className="container px-4 mx-auto flex flex-wrap items-center justify-between max-w-6xl">
            <div className="w-full relative flex justify-between items-center lg:w-auto px-4 lg:static lg:block lg:justify-start">
              <Link
                className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap text-white"
                to="/"
              >
                <h1 className="text-6xl md:text-3xl font-bold tracking-tighter leading-tight md:pr-8">
                  {siteName}
                </h1>
              </Link>
              {menuItems?.length && (
                <button
                  className="group flex flex-col gap-1 text-white cursor-pointer border border-solid border-transparent rounded bg-transparent lg:hidden outline-none focus:outline-none"
                  type="button"
                  title="Abrir el menú"
                  onClick={() => setMenuOpen(!menuOpen)}
                >
                  <div
                    className={`w-6 transform-gpu duration-300 ease-out ${
                      menuOpen ? "translate-y-2full" : "delay-300"
                    }`}
                  >
                    <div
                      className={`w-full h-1 bg-white ${
                        menuOpen ? "rotate-45 delay-300" : "rounded"
                      } transform-gpu duration-300 ease-out`}
                    ></div>
                  </div>
                  <div className={`w-6 overflow-x-hidden`}>
                    <div
                      className={`w-full h-1 bg-white rounded ${
                        menuOpen ? "invisible" : ""
                      } transition-[visibility] duration-0 delay-300 ease-out`}
                    ></div>
                  </div>
                  <div
                    className={`w-6 transform-gpu duration-300 ease-out ${
                      menuOpen ? "-translate-y-2full" : "delay-300"
                    }`}
                  >
                    <div
                      className={`w-full h-1 bg-white ${
                        menuOpen ? "delay-300 -rotate-45" : "rounded"
                      } transform-gpu duration-300 ease-out`}
                    ></div>
                  </div>
                </button>
              )}
            </div>
            <div
              className={
                "overflow-hidden lg:flex flex-grow items-center transform-gpu delay-300 duration-300 " +
                (menuOpen ? "max-h-20" : "opacity-0 max-h-0")
              }
            >
              <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
                {menuItems?.map((menuItem, i) => (
                  <li className="nav-item" key={`menu-${i}`}>
                    <Link
                      className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                      to={menuItem.url}
                    >
                      {menuItem.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
