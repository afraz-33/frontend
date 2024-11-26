import React from "react";
import Navbar from "../components/NavbarLogo";
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

const NewBlogs = () => {
  const t = useTranslations("newblogs");
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">{t("title")}</h1>
        <p className="text-sm text-gray-500 mb-6">
          Door: Madelief | 18/08/2024 <br />
          {t("readTime")}
        </p>

        <p className="text-lg mb-6">{t("intro")}</p>

        <h2 className="text-2xl font-semibold mb-4">
          {t("burialOptionsTitle")}
        </h2>

        <h3 className="text-xl font-bold mb-2">
          {t("traditionalBurial.title")}
        </h3>
        <ul className="list-disc ml-8 mb-4">
          <li> {t("traditionalBurial.description1")}</li>
          <li>{t("traditionalBurial.description2")}</li>
          <li>{t("traditionalBurial.description3")}</li>
        </ul>

        <h3 className="text-xl font-bold mb-2"> {t("naturalBurial.title")}</h3>
        <ul className="list-disc ml-8 mb-4">
          <li>{t("naturalBurial.description1")}</li>
          <li>{t("naturalBurial.description2")}</li>
          <li>{t("naturalBurial.description3")}</li>
          <li>{t("naturalBurial.description4")}</li>
        </ul>

        <h3 className="text-xl font-bold mb-2">{t("shroudBurial.title")}</h3>
        <ul className="list-disc ml-8 mb-4">
          <li>{t("shroudBurial.description1")}</li>
          <li>{t("shroudBurial.description2")}</li>
        </ul>

        <h3 className="text-xl font-bold mb-2">{t("islamicBurial.title")}</h3>
        <ul className="list-disc ml-8 mb-4">
          <li>{t("islamicBurial.description1")}</li>
          <li>{t("islamicBurial.description2")}</li>
          <li>{t("islamicBurial.description3")}</li>
        </ul>

        <h3 className="text-xl font-bold mb-2">{t("jewishBurial.title")}</h3>
        <ul className="list-disc ml-8 mb-4">
          <li>{t("jewishBurial.description1")}</li>
          <li>{t("jewishBurial.description2")}</li>
          <li>{t("jewishBurial.description3")}</li>
        </ul>

        <h3 className="text-xl font-bold mb-2">
          {t("catholicProtestantBurial.title")}
        </h3>
        <ul className="list-disc ml-8 mb-4">
          <li>{t("catholicProtestantBurial.description1")}</li>
          <li>{t("catholicProtestantBurial.description2")}</li>
          <li>{t("catholicProtestantBurial.description3")}</li>
        </ul>

        <h3 className="text-xl font-bold mb-2">{t("militaryBurial.title")}</h3>
        <ul className="list-disc ml-8 mb-4">
          <li>{t("militaryBurial.description1")}</li>
          <li>{t("militaryBurial.description2")}</li>
          <li>{t("militaryBurial.description3")}</li>
        </ul>

        <h3 className="text-xl font-bold mb-2">{t("seaBurial.title")}</h3>
        <ul className="list-disc ml-8 mb-8">
          <li>{t("seaBurial.description1")}</li>
          <li>{t("seaBurial.description2")}</li>
          <li>{t("seaBurial.description3")}</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">
          {t("cremationOptionsTitle")}
        </h2>

        <h3 className="text-xl font-bold mb-2">
          {t("traditionalCremation.title")}
        </h3>
        <ul className="list-disc ml-8 mb-4">
          <li>{t("traditionalCremation.description1")}</li>
          <li>{t("traditionalCremation.description2")}</li>
          <li>{t("traditionalCremation.description3")}</li>
        </ul>

        <h3 className="text-xl font-bold mb-2">{t("resomation.title")}</h3>
        <ul className="list-disc ml-8 mb-4">
          <li>{t("resomation.description1")}</li>
          <li>{t("resomation.description2")}</li>
          <li>{t("resomation.description3")}</li>
        </ul>

        <h3 className="text-xl font-bold mb-2">{t("eternalReefs.title")}</h3>
        <ul className="list-disc ml-8 mb-4">
          <li>{t("eternalReefs.description1")}</li>
          <li>{t("eternalReefs.description2")}</li>
        </ul>

        <h3 className="text-xl font-bold mb-2">{t("ashScattering.title")}</h3>
        <ul className="list-disc ml-8 mb-4">
          <li>{t("ashScattering.description1")}</li>
          <li>{t("ashScattering.description2")}</li>
        </ul>

        <h3 className="text-xl font-bold mb-2">{t("urnPlacement.title")}</h3>
        <ul className="list-disc ml-8 mb-4">
          <li>{t("urnPlacement.description1")}</li>
          <li>{t("urnPlacement.description2")}</li>
        </ul>

        <h3 className="text-xl font-bold mb-2">
          {t("memorialJewellery.title")}
        </h3>
        <ul className="list-disc ml-8 mb-4">
          <li>{t("memorialJewellery.description1")}</li>
          <li>{t("memorialJewellery.description2")}</li>
        </ul>

        <h3 className="text-xl font-bold mb-2">
          {t("aerialAshScattering.title")}
        </h3>
        <ul className="list-disc ml-8 mb-4">
          <li>{t("aerialAshScattering.description1")}</li>
          <li>{t("memorialJewellery.description2")}</li>
        </ul>

        <h3 className="text-xl font-bold mb-2">{t("spaceCremation.title")}</h3>
        <ul className="list-disc ml-8 mb-8">
          <li>{t("spaceCremation.description1")}</li>
          <li>{t("spaceCremation.description2")}</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">
          {t("alternativeFormsTitle")}
        </h2>

        <h3 className="text-xl font-bold mb-2">
          {t("alternativeFormsTitle.title")}
        </h3>
        <ul className="list-disc ml-8 mb-4">
          <li>{t("alternativeFormsTitle.description1")}</li>
          <li>{t("alternativeFormsTitle.description2")}</li>
        </ul>

        <h3 className="text-xl font-bold mb-2">{t("composting.title")}</h3>
        <ul className="list-disc ml-8 mb-4">
          <li>{t("composting.description1")}</li>
          <li>{t("composting.description2")}</li>
        </ul>

        <h3 className="text-xl font-bold mb-2">{t("bodyFarm.title")}</h3>
        <ul className="list-disc ml-8 mb-4">
          <li>{t("bodyFarm.description1")}</li>
          <li>{t("bodyFarm.description2")}</li>
        </ul>

        <h3 className="text-xl font-bold mb-2">
          {t("virtualRealityMemorials.title")}
        </h3>
        <ul className="list-disc ml-8 mb-4">
          <li>{t("virtualRealityMemorials.description1")}</li>
          <li>{t("virtualRealityMemorials.description2")}</li>
        </ul>

        <h3 className="text-xl font-bold mb-2">{t("treeUrn.title")}</h3>
        <ul className="list-disc ml-8 mb-4">
          <li>{t("treeUrn.description1")}</li>
          <li>{t("treeUrn.description2")}</li>
        </ul>

        <h3 className="text-xl font-bold mb-2">{t("floatingBurial.title")}</h3>
        <ul className="list-disc ml-8 mb-4">
          <li>{t("urnPlacement.description1")}</li>
          <li>{t("urnPlacement.description2")}</li>
        </ul>

        <h3 className="text-xl font-bold mb-2">{t("mummification.title")}</h3>
        <ul className="list-disc ml-8 mb-4">
          <li>{t("mummification.description1")}</li>
          <li>{t("mummification.description2")}</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">{t("summary.title")}</h2>
        <p className="text-lg mb-6">{t("summary.description1")}</p>
        <p className="text-lg mb-6">{t("summary.description2")}</p>
      </div>
      <Footer />
    </>
  );
};

export default NewBlogs;
