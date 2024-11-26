import Navbar from "../components/NavbarLogo";
import Image from "next/image";
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

export default function Contact() {
  const t = useTranslations("contact");

  return (
    <>
      <Navbar />

      <section className="py-10 md:px-0 px-4">
        <div className="bg-footerBlue">
          <div className="container mx-auto py-10">
            <div className="w-fit flex flex-col gap-2 mb-10">
              <p className="text-2xl font-bold text-darkBlueText">
                {t("header")}
              </p>
              <hr />
            </div>
            <p className="text-xl leading-relaxed mb-10">{t("questions")}</p>
            <p className="text-xl leading-relaxed mb-10">{t("description1")}</p>
            <p className="text-xl leading-relaxed mb-10">
              {t("description2")}{" "}
              <a href="" className="text-blue-700">
                {t("descriptionLinkText")}
              </a>
              . {t("description3")}{" "}
              <a
                href={`mailto:${t("customerServiceEmail")}`}
                className="text-blue-700"
              >
                {t("customerServiceEmail")}
              </a>
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3  gap-4 md:gap-0 mt-10 container mx-auto text-darkBlueText">
          <div className="w-full flex flex-col">
            <h3 className="text-2xl font-bold mb-2">
              {t("visitingAddressHeader")}
            </h3>
            <p className="text-xl">
              {t("address.line1")} <br />
              {t("address.line2")} <br />
              {t("address.line3")}
            </p>
          </div>
          <div className="w-full flex flex-col">
            <h3 className="text-2xl font-bold mb-2">
              {t("postalAddressHeader")}
            </h3>
            <p className="text-xl">
              {t("address.line1")} <br />
              {t("address.line2")} <br />
              {t("address.line3")}
            </p>
          </div>
          <div className="w-full flex flex-col">
            <div className="flex gap-2">
              <Image
                src={"/icons/1591850_instagram_photo_icon.svg"}
                width={40}
                height={40}
                alt="Instagram"
              />
              <Image
                src={"/icons/5296501_linkedin_network_linkedin logo_icon.svg"}
                width={30}
                height={30}
                alt="Linkedin"
              />
              <Image
                src={"/icons/5365678_fb_facebook_facebook logo_icon.svg"}
                width={30}
                height={30}
                alt="Facebook"
              />
              <Image
                src={
                  "/icons/5584538_shubhambhatia_social media_thevectorframe_tik tok_tiktok_icon.svg"
                }
                width={50}
                height={50}
                alt="TikTok"
              />
              <Image
                src={
                  "/icons/11244080_x_twitter_elon musk_twitter new logo_icon.svg"
                }
                width={20}
                height={20}
                alt="Twitter"
              />
            </div>
            <p>
              <strong>{t("contactDetails.emailLabel")}:</strong>{" "}
              {t("customerServiceEmail")} <br />
              <strong>{t("contactDetails.kvkLabel")}:</strong> <br />
              <strong>{t("contactDetails.btwLabel")}:</strong>
            </p>
          </div>
        </div>

        <div className="container mx-auto border p-5 mt-10 border-black">
          <h3 className="text-2xl font-bold mt-5">{t("formHeader")}</h3>
          <form action="" className="mt-5 flex flex-col gap-4">
            <fieldset>
              <input
                type="text"
                placeholder={t("formFields.personalInfo")}
                className="py-2 px-4 bg-footerBlue placeholder-black text-black text-xl"
              />
            </fieldset>
            <div className="flex items-center gap-5 justify-between">
              <fieldset className="w-full">
                <input
                  type="text"
                  placeholder={t("formFields.firstName")}
                  className="py-2 px-4 placeholder-black bg-footerBlue text-black text-xl"
                />
              </fieldset>
              <fieldset className="w-full">
                <input
                  type="text"
                  placeholder={t("formFields.surname")}
                  className="py-2 px-4 placeholder-black bg-footerBlue text-black text-xl"
                />
              </fieldset>
            </div>
            <fieldset>
              <input
                type="text"
                placeholder={t("formFields.email")}
                className="py-2 px-4 placeholder-black bg-footerBlue text-black text-xl"
              />
            </fieldset>
            <div className="flex items-center gap-5 justify-between">
              <fieldset className="w-full">
                <input
                  type="text"
                  placeholder={t("formFields.phone")}
                  className="py-2 px-4 placeholder-black bg-footerBlue text-black text-xl"
                />
              </fieldset>
              <fieldset className="w-full">
                <input
                  type="text"
                  placeholder={t("formFields.phone")}
                  className="py-2 px-4 placeholder-black bg-footerBlue text-black text-xl"
                />
              </fieldset>
            </div>
            <fieldset className="flex flex-col gap-3">
              <label htmlFor="additionalComments" className="text-xl">
                {t("formFields.additionalComments")}
              </label>
              <textarea
                id="additionalComments"
                cols={30}
                rows={10}
                className="py-2 px-4 w-full placeholder-black bg-footerBlue text-black text-xl"
              ></textarea>
            </fieldset>
            <button className="text-xl bg-darkBlueText rounded-full px-8 py-1 w-fit text-white">
              {t("formButton")}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
