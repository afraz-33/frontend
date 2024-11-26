import Image from "next/image";
import React from "react";
import Navbar from "../components/NavbarLogo"; // Assuming you have a Navbar
import "../src/app/what-to-do.css";
import Footer from "../components/footer";
import { useTranslations } from "next-intl";

export async function getStaticProps({ locale }) {
  console.log("Current Locale:", locale); // Debug

  return {
    props: {
      locale: locale || "en", // Fallback to 'en' if locale is undefined
      messages: (await import(`../locales/${locale || "en"}.json`)).default,
    },
  };
}
const WhatToDo = () => {
  const t = useTranslations("what-to-do");
  return (
    <>
      <Navbar />

      {/* Hero Image Section */}
      <section className="relative -mt-1">
        <p className="text-xl text-gray-400 px-10 mx-auto my-5">
          {t("hero.whatToDo")}
        </p>
        <div className="w-full md:h-[60vh] overflow-clip">
          <Image
            src="/6.jpeg" // Replace this with the actual image path
            alt="Flowers background"
            layout="responsive"
            className="w-full "
            width={300}
            height={200}
            objectFit="contain"
          />
        </div>
      </section>

      {/* Main Content */}
      <section className="mt-10 px-4 lg:px-24">
        <h1 className="text-3xl font-bold text-left mb-8">
          {t("hero.mainHeading")}
        </h1>
        <hr />
        <br />

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-20 justify-items-center">
          <div className="bg-blue-100 p-10 md:p-20 rounded-[36px] shadow-lg md:h-[50vh] flex flex-col items-center justify-start md:gap-10 w-3/4">
            <h2 className="text-2xl md:text-3xl font-semibold text-center mb-4">
              {t("steps.step1.heading")}
            </h2>
            <p className="text-xl md:text-2xl text-center text-gray-700">
              {t("steps.step1.text")}
            </p>
          </div>

          <div className="bg-blue-100 p-10 md:p-20 rounded-[36px] shadow-lg md:h-[50vh] flex flex-col items-center justify-start md:gap-10 w-3/4">
            <h2 className="text-2xl md:text-3xl font-semibold text-center mb-4">
              {t("steps.step2.heading")}
            </h2>
            <p className="text-xl md:text-2xl text-center text-gray-700">
              {t("steps.step2.text")}
            </p>
          </div>

          <div className="bg-blue-100 p-10 md:p-20 rounded-[36px] shadow-lg md:h-[50vh] flex flex-col items-center justify-start md:gap-10 w-3/4">
            <h2 className="text-2xl md:text-3xl font-semibold text-center mb-4">
              {t("steps.step3.heading")}
            </h2>
            <p className="text-xl md:text-2xl text-center text-gray-700">
              {t("steps.step3.text")}
            </p>
          </div>

          <div className="bg-blue-100 p-10 md:p-20 rounded-[36px] shadow-lg md:h-[50vh] flex flex-col items-center justify-start md:gap-10 w-3/4">
            <h2 className="text-2xl md:text-3xl font-semibold text-center mb-4">
              {t("steps.step4.heading")}
            </h2>
            <p className="text-xl md:text-2xl text-center text-gray-700">
              {t("steps.step4.text")}
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white px-4">
        <div className="container mx-auto">
          {/* Rest and Care after the farewell */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              {t("restAndCare.heading")}
            </h3>
            <p className="text-gray-700 leading-relaxed text-xl mb-6">
              {t("restAndCare.text")}
            </p>
            <ul className="list-decimal text-xl list-inside text-gray-700 leading-relaxed mb-6">
              <li>{t("restAndCare.list.item1")}</li>
              <li>{t("restAndCare.list.item2")}</li>
              <li>{t("restAndCare.list.item3")}</li>
              <li>{t("restAndCare.list.item4")}</li>
            </ul>
            <p className="text-gray-700 leading-relaxed text-xl">
              {t("restAndCare.finalText")}
            </p>
          </div>
          <hr />
          <br />
          {/* Funeral Insurance Section */}
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              {t("funeralInsurance.heading")}
            </h3>
            <h4 className="text-xl font-semibold text-gray-800 mb-4">
              {t("funeralInsurance.whatIs.heading")}
            </h4>
            <p className="text-gray-700 leading-relaxed mb-6 text-xl">
              {t("funeralInsurance.whatIs.text")}
            </p>

            <h4 className="text-xl font-semibold text-gray-800 mb-4">
              {t("funeralInsurance.types.heading")}
            </h4>
            <ul className="list-decimal text-xl list-inside text-gray-700 leading-relaxed mb-6">
              <li>{t("funeralInsurance.types.list.item1")}</li>
              <li>{t("funeralInsurance.types.list.item2")}</li>
              <li>{t("funeralInsurance.types.list.item3")}</li>
            </ul>

            <h4 className="text-xl font-semibold text-gray-800 mb-4">
              {t("funeralInsurance.important.heading")}
            </h4>
            <p className="text-gray-700 leading-relaxed text-xl">
              {t("funeralInsurance.important.text")}
            </p>

            <h4 className="text-xl font-semibold text-gray-800 mb-4">
              {t("funeralInsurance.noInsurance.heading")}
            </h4>
            <p className="text-gray-700 leading-relaxed text-xl">
              {t("funeralInsurance.noInsurance.text")}
            </p>

            <h4 className="text-xl font-semibold text-gray-800 mb-4">
              {t("funeralInsurance.choosing.heading")}
            </h4>
            <p className="text-gray-700 leading-relaxed text-xl">
              {t("funeralInsurance.choosing.text")}
            </p>
            <ul className="list-decimal list-inside text-gray-700 leading-relaxed mb-6 text-xl">
              <li>{t("funeralInsurance.choosing.list.item1")}</li>
              <li>{t("funeralInsurance.choosing.list.item2")}</li>
              <li>{t("funeralInsurance.choosing.list.item3")}</li>
              <li>{t("funeralInsurance.choosing.list.item4")}</li>
            </ul>

            <h4 className="text-xl font-semibold text-gray-800 mb-4">
              {t("funeralInsurance.benefits.heading")}
            </h4>
            <p className="text-gray-700 leading-relaxed text-xl">
              {t("funeralInsurance.benefits.text")}
            </p>
            <ul className="list-decimal list-inside text-gray-700 leading-relaxed mb-6 text-xl">
              <li>{t("funeralInsurance.benefits.list.item1")}</li>
              <li>{t("funeralInsurance.benefits.list.item2")}</li>
              <li>{t("funeralInsurance.benefits.list.item3")}</li>
            </ul>

            <h4 className="text-xl font-semibold text-gray-800 mb-4">
              {t("funeralInsurance.whenToClose.heading")}
            </h4>
            <p className="text-gray-700 leading-relaxed text-xl">
              {t("funeralInsurance.whenToClose.text")}
            </p>

            <h4 className="text-xl font-semibold text-gray-800 mb-4">
              {t("funeralInsurance.caseOfDeath.heading")}
            </h4>
            <p className="text-gray-700 leading-relaxed text-xl">
              {t("funeralInsurance.caseOfDeath.text")}
            </p>

            <p className="text-xl">{t("funeralInsurance.conclusion.text")}</p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default WhatToDo;
