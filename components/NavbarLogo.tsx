import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation"; // Use the new usePathname hook
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import "../src/app/globals.css";
import LanguageSwitcher from "./languageSwitcher";
import { useTranslations } from "use-intl";

export async function getStaticProps({ locale }) {
  console.log("Current Locale:", locale); // Debug

  return {
    props: {
      locale: locale || "en", // Fallback to 'en' if locale is undefined
      messages: (await import(`../locales/${locale || "en"}.json`)).default,
    },
  };
}

const Navbar = () => {
  const t = useTranslations("navbar");
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname(); // Get the current path

  const isActive = (path: string): boolean => {
    return pathname === path; // Compare current path with link path
  };

  return (
    <nav
      className="bg-white-100 shadow-lg sticky top-0 z-50 py-5"
      style={{ maxHeight: "125px" }}
    >
      <div className="container mx-auto px-4 flex justify-between items-center py-3">
        {/* Logo */}

        <Link href="/" passHref>
          <div className="flex items-center cursor-pointer ">
            <Image
              src="/logo-cropped.png"
              alt="Logo"
              width={200}
              height={200}
              className="object-contain"
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
                d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
              ></path>
            </svg>
          </button>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 font-semibold text-xl">
          <li>
            <Link href="/" legacyBehavior>
              <a
                className={`hover:text-blue-800 ${
                  isActive("/") ? "text-blue-800" : "text-gray-800"
                }`}
              >
                {t("home")}
              </a>
            </Link>
          </li>
          <li>
            <Link href="/burying" legacyBehavior>
              <a
                className={`hover:text-blue-800 ${
                  isActive("/burying") ? "text-blue-800" : "text-gray-800"
                }`}
              >
                {t("burying")}
              </a>
            </Link>
          </li>
          <li>
            <Link href="/cremation" legacyBehavior>
              <a
                className={`hover:text-blue-800 ${
                  isActive("/cremation") ? "text-blue-800" : "text-gray-800"
                }`}
              >
                {t("cremation")}
              </a>
            </Link>
          </li>
          <li>
            <Link href="/what-to-do" legacyBehavior>
              <a
                className={`hover:text-blue-800 ${
                  isActive("/what-to-do") ? "text-blue-800" : "text-gray-800"
                }`}
              >
                {t("what_to_do")}
              </a>
            </Link>
          </li>
          <li>
            <Link href="/blogs" legacyBehavior>
              <a
                className={`hover:text-blue-800 ${
                  isActive("/blogs") ? "text-blue-800" : "text-gray-800"
                }`}
              >
                {t("blogs")}
              </a>
            </Link>
          </li>
          <li>
            <Link href="/about" legacyBehavior>
              <a
                className={`hover:text-blue-800 ${
                  isActive("/about") ? "text-blue-800" : "text-gray-800"
                }`}
              >
                {t("about_us")}
              </a>
            </Link>
          </li>
          <li>
            <Link href="/partner" legacyBehavior>
              <a
                className={`hover:text-blue-800 ${
                  isActive("/partner") ? "text-blue-800" : "text-gray-800"
                }`}
              >
                {t("partner")}
              </a>
            </Link>
          </li>
        </ul>

        {/* URGENT Button and Search (Visible on larger screens) */}
        <div className="hidden md:flex items-center space-x-4">
          <button className="bg-orange-500 text-gray-800 px-4 py-2 rounded-lg font-semibold text-xl">
            {t("urgent")}
          </button>
          <Link href="/cremation" legacyBehavior>
            <a className="text-gray-800 text-lg hover:text-gray-500 flex items-center">
              <SearchIcon style={{ fontSize: "24px", marginRight: "8px" }} />
              <span className="ml-2">{t("search")}</span>{" "}
              {/* Text aligned next to the icon */}
            </a>
          </Link>
        </div>

        <LanguageSwitcher />
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white">
          <ul className="space-y-4 p-4">
            <li>
              <Link href="/" legacyBehavior>
                <a
                  className={`hover:text-blue-800 text-gray-800 text-lg block ${
                    isActive("/") ? "text-blue-800 underline" : ""
                  }`}
                >
                  {t("home")}
                </a>
              </Link>
            </li>
            <li>
              <Link href="/burying" legacyBehavior>
                <a
                  className={`hover:text-blue-800 text-gray-800 text-lg block ${
                    isActive("/burying") ? "text-blue-800 underline" : ""
                  }`}
                >
                  {t("burying")}
                </a>
              </Link>
            </li>
            <li>
              <Link href="/cremation" legacyBehavior>
                <a
                  className={`hover:text-blue-800 text-gray-800 text-lg block ${
                    isActive("/cremation") ? "text-blue-800 underline" : ""
                  }`}
                >
                  {t("cremation")}
                </a>
              </Link>
            </li>
            <li>
              <Link href="/what-to-do" legacyBehavior>
                <a
                  className={`hover:text-blue-800 text-gray-800 text-lg block ${
                    isActive("/what-to-do") ? "text-blue-800 underline" : ""
                  }`}
                >
                  {t("what_to_do")}
                </a>
              </Link>
            </li>
            <li>
              <Link href="/blogs" legacyBehavior>
                <a
                  className={`hover:text-blue-800 text-gray-800 text-lg block ${
                    isActive("/blogs") ? "text-blue-800 underline" : ""
                  }`}
                >
                  {t("blogs")}
                </a>
              </Link>
            </li>
            <li>
              <Link href="/about" legacyBehavior>
                <a
                  className={`hover:text-blue-800 text-gray-800 text-lg block ${
                    isActive("/about") ? "text-blue-800 underline" : ""
                  }`}
                >
                  {t("about_us")}
                </a>
              </Link>
            </li>
            <li className="mt-4">
              <button
                className="bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold w-full text-xl"
                style={{ color: "black" }}
              >
                {t("urgent")}
              </button>
            </li>
            <li className="mt-4">
              <Link href="/search" legacyBehavior>
                <a className="text-gray-800 text-lg hover:text-gray-500 flex items-center">
                  <SearchIcon
                    style={{ fontSize: "24px", marginRight: "8px" }}
                  />
                  <span className="ml-2">{t("search")}</span>
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
