import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation'; // Use the new usePathname hook
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import '../src/app/globals.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname(); // Get the current path

  const isActive = (path: string): boolean => {
    return pathname === path; // Compare current path with link path
  };

  return (
    <nav className="bg-white-100 shadow-lg sticky top-0 z-50" style={{ maxHeight: '125px' }}>
      <div className="container mx-auto px-4 flex justify-between items-center py-3">
        {/* Logo */}
        <Link href="/" passHref>
          <div className="flex items-center cursor-pointer">
            <Image
              src="/logo.png"
              alt="Logo"
              width={120}
              height={120}
              className="object-contain"
              style={{ maxHeight: '100%', maxWidth: '100%' }}
            />
          </div>
        </Link>

        {/* Hamburger menu for mobile */}
        <div className="md:hidden">
          <button
            className="text-gray-800 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
              ></path>
            </svg>
          </button>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 font-semibold text-xl">
          <li>
            <Link href="/" legacyBehavior>
              <a className={`hover:text-blue-800 ${isActive('/') ? 'text-blue-800' : 'text-gray-800'}`}>Home</a>
            </Link>
          </li>
          <li>
            <Link href="/burying" legacyBehavior>
              <a className={`hover:text-blue-800 ${isActive('/burying') ? 'text-blue-800' : 'text-gray-800'}`}>Burying</a>
            </Link>
          </li>
          <li>
            <Link href="/cremation" legacyBehavior>
              <a className={`hover:text-blue-800 ${isActive('/cremation') ? 'text-blue-800' : 'text-gray-800'}`}>Cremation</a>
            </Link>
          </li>
          <li>
            <Link href="/what-to-do" legacyBehavior>
              <a className={`hover:text-blue-800 ${isActive('/what-to-do') ? 'text-blue-800' : 'text-gray-800'}`}>What to do</a>
            </Link>
          </li>
          <li>
            <Link href="/blogs" legacyBehavior>
              <a className={`hover:text-blue-800 ${isActive('/blogs') ? 'text-blue-800' : 'text-gray-800'}`}>Blogs</a>
            </Link>
          </li>
          <li>
            <Link href="/about" legacyBehavior>
              <a className={`hover:text-blue-800 ${isActive('/about') ? 'text-blue-800' : 'text-gray-800'}`}>About us</a>
            </Link>
          </li>
        </ul>

        {/* URGENT Button and Search (Visible on larger screens) */}
        <div className="hidden md:flex items-center space-x-4">
          <button className="bg-orange-500 text-gray-800 px-4 py-2 rounded-lg font-semibold text-xl">
            URGENT 24/7
          </button>
          <Link href="/search" legacyBehavior>
            <a className="text-gray-800 text-lg hover:text-gray-500 flex items-center">
              <SearchIcon style={{ fontSize: '24px', marginRight: '8px' }} />
              <span className="ml-2">Search</span> {/* Text aligned next to the icon */}
            </a>
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white">
          <ul className="space-y-4 p-4">
            <li>
              <Link href="/" legacyBehavior>
                <a className={`hover:text-blue-800 text-gray-800 text-lg block ${isActive('/') ? 'text-blue-800 underline' : ''}`}>Home</a>
              </Link>
            </li>
            <li>
              <Link href="/burying" legacyBehavior>
                <a className={`hover:text-blue-800 text-gray-800 text-lg block ${isActive('/burying') ? 'text-blue-800 underline' : ''}`}>Burying</a>
              </Link>
            </li>
            <li>
              <Link href="/cremation" legacyBehavior>
                <a className={`hover:text-blue-800 text-gray-800 text-lg block ${isActive('/cremation') ? 'text-blue-800 underline' : ''}`}>Cremation</a>
              </Link>
            </li>
            <li>
              <Link href="/what-to-do" legacyBehavior>
                <a className={`hover:text-blue-800 text-gray-800 text-lg block ${isActive('/what-to-do') ? 'text-blue-800 underline' : ''}`}>What to do</a>
              </Link>
            </li>
            <li>
              <Link href="/blogs" legacyBehavior>
                <a className={`hover:text-blue-800 text-gray-800 text-lg block ${isActive('/blogs') ? 'text-blue-800 underline' : ''}`}>Blogs</a>
              </Link>
            </li>
            <li>
              <Link href="/about" legacyBehavior>
                <a className={`hover:text-blue-800 text-gray-800 text-lg block ${isActive('/about') ? 'text-blue-800 underline' : ''}`}>About us</a>
              </Link>
            </li>
            <li className="mt-4">
              <button className="bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold w-full text-xl" style={{ color: "black" }}>
                URGENT 24/7
              </button>
            </li>
            <li className="mt-4">
              <Link href="/search" legacyBehavior>
                <a className="text-gray-800 text-lg hover:text-gray-500 flex items-center">
                  <SearchIcon style={{ fontSize: '24px', marginRight: '8px' }} />
                  <span className="ml-2">Search</span>
                </a>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
