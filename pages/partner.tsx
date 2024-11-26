import Image from "next/image";
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

export default function Partner() {
  const t = useTranslations("partner");
  return (
    <>
      <Navbar />
      <Image
        src={"/partner-header.png"}
        alt="partner header"
        height={400}
        width={400}
        className="w-full"
      />
      <section className="container mx-auto my-10 flex flex-col gap-5">
        <h3 className="text-3xl font-bold text-darkBlueText">
          {t("ourTrustedPartnersAndServices")}
        </h3>
        <hr className="mt-5 w-1/2" />

        {/* Our floral partners for thoughtful tributes */}
        <div>
          <h3 className="text-2xl font-bold text-darkBlueText">
            {t("floralPartnersTitle")}
          </h3>
          <p className="text-darkBlueText my-5">
            {t("floralPartnersDescription")}
          </p>
          <div className="flex gap-2 w-full">
            <div className="flex flex-col gap-1 w-full">
              <Image
                src={"/partner00.png"}
                className="w-full"
                alt="Partner 1"
                height={200}
                width={200}
              />
              <p className="mt-2 text-blue-500 font-bold">{t("partner1")}</p>
            </div>
            <div className="flex flex-col gap-1 w-full">
              <Image
                src={"/partner01.png"}
                className="w-full"
                alt="Partner 1"
                height={200}
                width={200}
              />
              <p className="mt-2 text-blue-500 font-bold">{t("partner2")}</p>
            </div>
            <div className="flex flex-col gap-1 w-full">
              <Image
                src={"/partner02.png"}
                className="w-full"
                alt="Partner 1"
                height={200}
                width={200}
              />
              <p className="mt-2 text-blue-500 font-bold">{t("partner3")}</p>
            </div>
          </div>
          <div className="w-full my-10 flex justify-center">
            <hr className="w-3/4 border-b border-gray-300" />
          </div>
        </div>

        {/* Memorial cards */}
        <div>
          <h3 className="text-2xl font-bold text-darkBlueText">
            {t("memorialCardsTitle")}
          </h3>
          <p className="text-darkBlueText my-5">
            {t("memorialCardsDescription")}
          </p>
          <div className="flex gap-2 w-full">
            <div className="flex flex-col gap-1 w-full">
              <Image
                src={"/partner10.png"}
                className="w-full"
                alt="Partner 1"
                height={200}
                width={200}
              />
              <p className="mt-2 text-blue-500 font-bold">{t("partner4")}</p>
            </div>
            <div className="flex flex-col gap-1 w-full">
              <Image
                src={"/partner11.png"}
                className="w-full"
                alt="Partner 1"
                height={200}
                width={200}
              />
              <p className="mt-2 text-blue-500 font-bold">{t("partner5")}</p>
            </div>
            <div className="flex flex-col gap-1 w-full">
              <Image
                src={"/partner12.png"}
                className="w-full"
                alt="Partner 1"
                height={200}
                width={200}
              />
              <p className="mt-2 text-blue-500 font-bold">{t("partner6")}</p>
            </div>
          </div>
          <div className="w-full my-10 flex justify-center">
            <hr className="w-3/4 border-b border-gray-300" />
          </div>
        </div>

        {/* Memorial stones & plaques */}
        <div>
          <h3 className="text-2xl font-bold text-darkBlueText">
            {t("memorialStonesTitle")}
          </h3>
          <p className="text-darkBlueText my-5">
            {t("memorialStonesDescription")}
          </p>
          <div className="flex gap-2 w-full">
            <div className="flex flex-col gap-1 w-full">
              <Image
                src={"/partner20.png"}
                className="w-full"
                alt="Partner 1"
                height={200}
                width={200}
              />
              <p className="mt-2 text-blue-500 font-bold">{t("partner7")}</p>
            </div>
            <div className="flex flex-col gap-1 w-full">
              <Image
                src={"/partner21.png"}
                className="w-full"
                alt="Partner 1"
                height={200}
                width={200}
              />
              <p className="mt-2 text-blue-500 font-bold">{t("partner8")}</p>
            </div>
            <div className="flex flex-col gap-1 w-full">
              <Image
                src={"/partner22.png"}
                className="w-full"
                alt="Partner 1"
                height={200}
                width={200}
              />
              <p className="mt-2 text-blue-500 font-bold">{t("partner9")}</p>
            </div>
          </div>
          <div className="w-full my-10 flex justify-center">
            <hr className="w-3/4 border-b border-gray-300" />
          </div>
        </div>

        {/* Caskets & Urns */}
        <div>
          <h3 className="text-2xl font-bold text-darkBlueText">
            {t("casketsAndUrnsTitle")}
          </h3>
          <p className="text-darkBlueText my-5">
            {t("casketsAndUrnsDescription")}
          </p>
          <div className="flex gap-2 w-full">
            <div className="flex flex-col gap-1 w-full">
              <Image
                src={"/partner30.png"}
                className="w-full"
                alt="Partner 1"
                height={200}
                width={200}
              />
              <p className="mt-2 text-blue-500 font-bold">{t("partner10")}</p>
            </div>
            <div className="flex flex-col gap-1 w-full">
              <Image
                src={"/partner31.png"}
                className="w-full"
                alt="Partner 1"
                height={200}
                width={200}
              />
              <p className="mt-2 text-blue-500 font-bold">{t("partner11")}</p>
            </div>
            <div className="flex flex-col gap-1 w-full">
              <Image
                src={"/partner32.png"}
                className="w-full"
                alt="Partner 1"
                height={200}
                width={200}
              />
              <p className="mt-2 text-blue-500 font-bold">{t("partner12")}</p>
            </div>
          </div>
          <div className="w-full my-10 flex justify-center">
            <hr className="w-3/4 border-b border-gray-300" />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
