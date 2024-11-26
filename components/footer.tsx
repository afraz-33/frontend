"use client";

import { link } from "fs";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";

export default function Footer() {
  const footerLinks = [
    {
      text: "Home",
      link: "/",
    },
    {
      text: "About us",
      link: "/about",
    },
    {
      text: "Contact us",
      link: "/contact",
    },
    {
      text: "What to do",
      link: "/what-to-do",
    },
    {
      text: "Blogs",
      link: "/blogs",
    },
  ];

  const footerLinksDutch = [
    {
      text: "Home",
      link: "/",
    },
    {
      text: "Over ons",
      link: "/about",
    },
    {
      text: "Contacteer ons",
      link: "/contact",
    },
    {
      text: "Wat te doen",
      link: "/what-to-do",
    },
    {
      text: "Blogs",
      link: "/blogs",
    },
  ];

  const footerLinks2 = [
    {
      text: "General terms and conditions",
      link: "/terms",
    },
    {
      text: "Privacy Policy",
      link: "/privacy",
    },
    {
      text: "Chamber of Commerce number",
      link: "/chamber",
    },
  ];

  const footerLinks2Dutch = [
    {
      text: "Algemene voorwaarden",
      link: "/terms",
    },
    {
      text: "Privacybeleid",
      link: "/privacy",
    },
    {
      text: "Kamer van Koophandel nummer",
      link: "/chamber",
    },
  ];

  const pathname = usePathname();

  const isActive = (path: string): boolean => {
    return pathname === path; // Compare current path with link path
  };

  const t = useTranslations("footer");
  const { locale } = useRouter();

  return (
    <>
      <section className="bg-[#f9feff] shadow-inner">
        <footer className="grid grid-cols-12 container mx-auto py-10">
          <div className="col-span-5">
            <div className="flex w-full  flex-1 shrink-0 flex-col">
              <Image
                className=""
                src={"/logo-cropped.png"}
                width={350}
                height={350}
                alt="Logo"
              />
            </div>
            <p className="text-xl font-bold mt-10 text-[#02084b]">
              {t("menu")}
            </p>
            <hr className="w-1/2 my-4 border border-lightGray" />
            <ul className="flex flex-col gap-1 text-lg">
              {locale === "en"
                ? footerLinks.map((link, idx) => {
                    return (
                      <li key={idx} className="text-xl text-[#02084b]">
                        <a
                          className={`hover:text-[#171c5a] ${
                            isActive(link.link)
                              ? "text-[#02084b] font-bold"
                              : "text-[#171c5a]"
                          }`}
                          href={link.link}
                        >
                          {link.text}
                        </a>
                      </li>
                    );
                  })
                : footerLinksDutch.map((link, idx) => {
                    return (
                      <li key={idx} className="text-xl text-[#02084b]">
                        <a
                          className={`hover:text-[#171c5a] ${
                            isActive(link.link)
                              ? "text-[#02084b] font-bold"
                              : "text-[#171c5a]"
                          }`}
                          href={link.link}
                        >
                          {link.text}
                        </a>
                      </li>
                    );
                  })}
            </ul>
            <p className="text-xl font-extrabold text-[#02084b] mt-3">
              {t("foundationFarewell")}
            </p>
          </div>
          <div className="h-full w-full   flex flex-col justify-end col-span-3">
            <p className="text-xl font-bold text-[#02084b] mt-3">
              {t("followStory")}
            </p>
            <div className="flex gap-2">
              <Image
                src={"/icons/1591850_instagram_photo_icon.svg"}
                width={40}
                height={40}
                alt="instagram"
              />
              <Image
                src={"/icons/5296501_linkedin_network_linkedin logo_icon.svg"}
                width={30}
                height={30}
                alt="linkedin"
              />
              <Image
                src={"/icons/5365678_fb_facebook_facebook logo_icon.svg"}
                width={30}
                height={30}
                alt="facebook"
              />
              <Image
                src={
                  "/icons/5584538_shubhambhatia_social media_thevectorframe_tik tok_tiktok_icon.svg"
                }
                width={50}
                height={50}
                alt="tiktok"
              />
              <Image
                src={
                  "/icons/11244080_x_twitter_elon musk_twitter new logo_icon.svg"
                }
                width={20}
                height={20}
                alt="twitter"
              />
            </div>
          </div>
          <div className="h-full w-full  flex flex-col justify-between col-span-4">
            <p className="text-xl font-bold text-[#02084b] mt-5">
              {t("aboutUs")}
            </p>
            <hr className="w-1/2 border-b border-lightGray" />
            <p className="text-[#02084b] px-2">{t("aboutUsDescription")}</p>
            <p className="text-xl font-bold text-[#02084b]">
              {t("importantInformation")}
            </p>
            <hr className="w-1/2 border-b border-lightGray" />
            <ul className="px-2">
              {locale === "en"
                ? footerLinks2.map((link, idx) => {
                    return (
                      <li key={idx} className="text-[#02084b]">
                        <a
                          className={`hover:text-[#02084b] ${
                            isActive(link.link)
                              ? "text-[#02084b] font-bold"
                              : "text-[#171c5a]"
                          }`}
                          href={link.link}
                        >
                          {link.text}
                        </a>
                      </li>
                    );
                  })
                : footerLinks2Dutch.map((link, idx) => {
                    return (
                      <li key={idx} className="text-[#02084b]">
                        <a
                          className={`hover:text-[#02084b] ${
                            isActive(link.link)
                              ? "text-[#02084b] font-bold"
                              : "text-[#171c5a]"
                          }`}
                          href={link.link}
                        >
                          {link.text}
                        </a>
                      </li>
                    );
                  })}
            </ul>
          </div>
        </footer>
      </section>
    </>
  );
}
