import React, { useEffect } from "react";
import Navbar from "../components/NavbarLogo";
import Footer from "../components/footer";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";

export async function getStaticProps({ locale }) {
  console.log("Current Locale:", locale); // Debug

  return {
    props: {
      locale: locale || "en", // Fallback to 'en' if locale is undefined
      messages: (await import(`../locales/${locale || "en"}.json`)).default,
    },
  };
}

const About = () => {
  const router = useRouter();
  const { locale } = router;

  const t = useTranslations("about");
  return (
    <>
      <Navbar />
      <section className="bg-white py-16 px-8">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-darkBlueText mb-8">
            {t("heading")}
          </h2>
          <p className="text-xl md:text-2xl text-gray-700 leading-loose mb-6">
            {t("paragraph1")}
          </p>

          <div className="flex md:flex-row flex-col justify-between items-center mb-12">
            <p className="text-xl  md:text-2xl text-gray-700 md:leading-10 mb-6 md:w-3/4">
              {t("paragraph2")}
            </p>
            <div className="md:w-3/4 flex justify-center">
              <Image
                src={"/about-us.png"}
                alt="about us image"
                height={450}
                width={450}
              />
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-darkBlueText mb-8">
            {t("heading2")}
          </h2>

          <p className="text-xl md:text-2xl text-gray-700 leading-loose mb-6">
            {t("paragraph3")}
          </p>

          <ul className="text-xl md:text-2xl list-disc  list-inside text-gray-700 leading-loose mb-6">
            <li>
              <strong>{t("strong1")}</strong>
              {t("li1")}
            </li>
            <li>
              <strong>{t("strong2")}</strong>
              {t("li2")}
            </li>
            <li>
              <strong>{t("strong3")}</strong>
              {t("li3")}
            </li>
          </ul>
          <p className="text-xl md:text-2xl text-gray-700 leading-loose mb-6">
            {t("paragraph4")}
          </p>
          <Image
            src={"/about-us-2.png"}
            width={500}
            height={500}
            alt="About"
            className="w-full my-4"
          />
          <p className="text-xl md:text-2xl text-gray-700 leading-loose mb-6">
            {t("paragraph5")}
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-darkBlueText mb-8">
            {t("heading3")}
          </h2>

          <p className="text-xl md:text-2xl text-gray-700 leading-loose mb-6">
            {t("paragraph6")}
          </p>
          <p className="text-xl md:text-2xl text-gray-700 leading-loose mb-6">
            {t("paragraph7")}
          </p>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default About;
