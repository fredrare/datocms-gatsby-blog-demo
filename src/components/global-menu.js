import React from "react";
import { Link } from 'gatsby'
import { siteName } from '../common/strings'

export default function Menu() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const menuItems = [
    {name: 'Programación', url: '/categories/programming'},
    {name: 'Seguridad', url: '/categories/security'},
    // {name: 'Sobre mí', url: '/about'}
  ]
  return (
    <header className="flex flex-wrap">
      <div className="w-full">
        <nav className="relative flex flex-wrap items-center justify-between py-3 bg-pink-500">
          <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
            <div className="w-full relative flex justify-between lg:w-auto px-4 lg:static lg:block lg:justify-start">
              <Link
                className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap text-white"
                to="/"
              >
                <h1 className="text-6xl md:text-3xl font-bold tracking-tighter leading-tight md:pr-8">
                  { siteName }
                </h1>
              </Link>
              {
                menuItems?.length && 
                <button
                  className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
                  type="button"
                  onClick={() => setMenuOpen(!menuOpen)}
                >
                  +
                </button>
              }
            </div>
            <div
              className={
                "lg:flex flex-grow items-center" +
                (menuOpen ? " flex" : " hidden")
              }
            >
              <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
                {
                  menuItems?.map(menuItem => 
                    <li className="nav-item">
                      <Link
                        className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                        to={menuItem.url}
                      >
                        {menuItem.name}
                      </Link>
                    </li>
                  )
                }
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}