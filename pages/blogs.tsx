import Image from "next/image";
import "../src/app/globals.css";
import Navbar from "../components/NavbarLogo";
import Link from "next/link";
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

const styles = {
  container: "container mx-auto px-4 py-8",
  title: "text-3xl font-bold mb-4",
  author: "text-sm text-gray-500 mb-6",
  imageWrapper: "mb-6",
  image: "rounded-md",
  text: "text-lg mb-4",
  subheading: "text-2xl font-semibold mb-4",
  subSubheading: "text-xl font-semibold mb-4",
  list: "list-disc ml-8 mb-8",
};
const BlogSection = () => {
  const t = useTranslations("blogs");
  return (
    <>
      <Navbar />
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          {/* Heading */}
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
            {t("heading")}
          </h2>

          {/* Blog 1 - Natural Burial */}
          <div className="flex flex-col md:flex-row items-start">
            {/* Text Section */}
            <div className="md:w-2/3">
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                {t("blog1.title")}
              </h3>
              <p className="text-sm text-gray-500 mb-4">{t("blog1.author")}</p>

              <p className="text-lg text-gray-800 mb-4">
                {t("blog1.paragraph1")}
              </p>

              <h4 className="text-xl font-semibold text-gray-700 mb-2">
                {t("blog1.subheading1")}
              </h4>
              <p className="text-lg text-gray-800 mb-4">
                {t("blog1.paragraph2")}
              </p>

              <h4 className="text-xl font-semibold text-gray-700 mb-2">
                {t("blog1.subheading2")}
              </h4>
              <ul className="list-disc pl-5 text-lg text-gray-800 mb-4">
                <li>{t("blog1.list1")}</li>
                <li>{t("blog1.list2")}</li>
                <li>{t("blog1.list3")}</li>
              </ul>

              <h4 className="text-xl font-semibold text-gray-700 mb-2">
                {t("blog1.subheading3")}
              </h4>
              <p className="text-lg text-gray-800 mb-4">
                {t("blog1.paragraph3")}
              </p>
            </div>

            {/* Image Section */}
            <div className="md:w-1/3 md:ml-8 mt-8 md:mt-0">
              <Image
                src="/5.png" // Ensure the image is placed in the /public directory
                alt={t("blog1.title")}
                width={500}
                height={400}
                className="rounded-lg"
                objectFit="cover"
              />
            </div>
          </div>

          <br />
          <hr />
          <br />
          <br />

          {/* Blog 2 - Digital Legacy */}
          <div className="mb-12">
            <div className="w-full flex justify-center">
              <div className="w-full">
                <Image
                  src="/6.jpeg" // Ensure the image is placed in the /public directory
                  alt={t("blog2.title")}
                  width={1200}
                  height={400}
                  className="object-cover mx-auto"
                />
              </div>
            </div>
            <br />
            <div className="flex md:flex-row">
              <div className="w-full">
                <h3 className="text-2xl font-bold mb-2">{t("blog2.title")}</h3>
                <p className="text-sm text-gray-600 mb-2">
                  {t("blog2.author")}
                </p>
                <p className="text-lg text-gray-800 leading-relaxed mb-4">
                  {t("blog2.paragraph1")}
                </p>

                <h4 className="text-xl font-bold mb-2">
                  {t("blog2.subheading1")}
                </h4>
                <p className="text-lg text-gray-800 leading-relaxed mb-4">
                  {t("blog2.paragraph2")}
                </p>

                <h4 className="text-xl font-bold mb-2">
                  {t("blog2.subheading2")}
                </h4>
                <p className="text-lg text-gray-800 leading-relaxed mb-4">
                  {t("blog2.paragraph3")}
                </p>

                <h4 className="text-xl font-bold mb-2">
                  {t("blog2.subheading3")}
                </h4>
                <ul className="text-lg list-disc list-inside mb-4 text-gray-800">
                  <li>{t("blog2.list1")}</li>
                  <li>{t("blog2.list2")}</li>
                  <li>{t("blog2.list3")}</li>
                </ul>
              </div>
            </div>
          </div>
          <hr />
          <br />

          {/* Blog 3 - Eternal Reefs */}
          <div className="flex flex-col md:flex-row md:space-x-8 md:items-start">
            {/* Text container */}
            <div className="md:w-2/3">
              <h2 className="text-2xl font-bold mb-2">{t("blog3.title")}</h2>
              <p className="text-sm text-gray-600 mb-4">{t("blog3.author")}</p>
              <p className="text-lg text-gray-800 mb-4">
                {t("blog3.paragraph1")}
              </p>
              <h3 className="text-xl font-bold mb-2">
                {t("blog3.subheading1")}
              </h3>
              <p className="text-lg text-gray-800 mb-4">
                {t("blog3.paragraph2")}
              </p>
              <h3 className="text-xl font-bold mb-2">
                {t("blog3.subheading2")}
              </h3>
              <ul className="text-lg list-disc pl-5 text-gray-800 mb-4">
                <li>{t("blog3.list1")}</li>
                <li>{t("blog3.list2")}</li>
                <li>{t("blog3.list3")}</li>
              </ul>
              <h3 className="text-xl font-bold mb-2">
                {t("blog3.subheading3")}
              </h3>
              <p className="text-lg text-gray-800">{t("blog3.paragraph3")}</p>
            </div>

            {/* Image Section */}
            <div className="md:w-1/3 md:ml-8 mt-8 md:mt-0">
              <Image
                src="/4.png"
                alt={t("blog3.title")}
                width={800}
                height={800}
                className="object-cover rounded-lg"
              />
            </div>
          </div>
          <br />
          <hr />
        </div>
      </section>

      {/* Special Places Section */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">
          {t("specialPlaces.heading")}
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          {t("specialPlaces.author")}
        </p>

        {/* Flexbox layout to position the image and text side by side */}
        <div className="flex flex-col md:flex-row items-start gap-8 mb-8">
          {/* Image Section */}
          <div className="w-full md:w-1/2">
            <Image
              src="/6.jpeg" // Ensure the image is placed in the /public directory
              alt="Funeral Location"
              width={700}
              height={200}
              className="rounded-md"
            />
          </div>

          {/* Text Section */}
          <div className="md:w-1/2">
            <p className="text-gray-800 text-lg mb-4">
              {t("specialPlaces.paragraph1")}
            </p>
            <p className="text-gray-800 text-lg">
              {t("specialPlaces.paragraph2")}
            </p>
          </div>
        </div>

        {/* Blog Entries for Special Places */}
        <div className="mb-8">
          {/* Blog 1 - On the Beach */}
          <h2 className="text-2xl font-semibold mb-4">
            {t("specialPlaces.blog1.title")}
          </h2>
          <p className="text-gray-800 text-lg mb-4">
            {t("specialPlaces.blog1.paragraph1")}
          </p>
          <p className="text-gray-800 text-lg mb-8">
            {t("specialPlaces.blog1.paragraph2")}
          </p>

          <h3 className="text-xl font-semibold mb-4">
            {t("specialPlaces.blog1.subheading")}
          </h3>
          <ul className="list-disc ml-8 mb-8">
            <li className="text-gray-800 mb-2">
              {t("specialPlaces.blog1.list1")}
            </li>
            <li className="text-gray-800 mb-2">
              {t("specialPlaces.blog1.list2")}
            </li>
            <li className="text-gray-800 mb-2">
              {t("specialPlaces.blog1.list3")}
            </li>
          </ul>
        </div>

        <hr />
        <br />

        {/* Repeat similar structure for blog2 and blog3 within specialPlaces */}
        {/* Blog 2 - In the Mountains */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            {t("specialPlaces.blog2.title")}
          </h2>
          <p className="text-gray-800 text-lg mb-4">
            {t("specialPlaces.blog2.paragraph1")}
          </p>
          <p className="text-gray-800 text-lg mb-8">
            {t("specialPlaces.blog2.paragraph2")}
          </p>

          <h3 className="text-xl font-semibold mb-4">
            {t("specialPlaces.blog2.subheading")}
          </h3>
          <ul className="list-disc ml-8 mb-8">
            <li className="text-gray-800 mb-2">
              {t("specialPlaces.blog2.list1")}
            </li>
            <li className="text-gray-800 mb-2">
              {t("specialPlaces.blog2.list2")}
            </li>
            <li className="text-gray-800 mb-2">
              {t("specialPlaces.blog2.list3")}
            </li>
          </ul>
        </div>

        <hr />
        <br />

        {/* Blog 3 - On a Boat */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            {t("specialPlaces.blog3.title")}
          </h2>
          <p className="text-gray-800 text-lg mb-4">
            {t("specialPlaces.blog3.paragraph1")}
          </p>
          <p className="text-gray-800 text-lg mb-8">
            {t("specialPlaces.blog3.paragraph2")}
          </p>

          <h3 className="text-xl font-semibold mb-4">
            {t("specialPlaces.blog3.subheading")}
          </h3>
          <ul className="list-disc ml-8 mb-8">
            <li className="text-gray-800 mb-2">
              {t("specialPlaces.blog3.list1")}
            </li>
            <li className="text-gray-800 mb-2">
              {t("specialPlaces.blog3.list2")}
            </li>
            <li className="text-gray-800 mb-2">
              {t("specialPlaces.blog3.list3")}
            </li>
          </ul>
        </div>

        {/* Conclusion */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            {t("specialPlaces.conclusion.subheading")}
          </h2>
          <p className="text-lg mb-4">
            {t("specialPlaces.conclusion.paragraph1")}
          </p>
          <p className="text-lg mb-8">
            {t("specialPlaces.conclusion.paragraph2")}
          </p>
        </div>
      </div>

      {/* Celebrate Life Section */}
      <div className="container mx-auto px-4 py-8">
        <hr />
        <br />
        {/* Image Section */}
        <div className="w-full mb-6 flex justify-center">
          <Image
            src="/6.jpeg" // Ensure the image is placed in the /public directory
            alt="Celebrate Life"
            width={800}
            height={50}
            className="rounded-md"
          />
        </div>

        <h2 className="text-xl font-bold mb-2">{t("celebrateLife.heading")}</h2>
        <p className="text-sm text-gray-500 mb-4">
          {t("celebrateLife.author")}
        </p>

        <p className="text-lg mb-4">{t("celebrateLife.paragraph1")}</p>
        <p className="text-lg">{t("celebrateLife.paragraph2")}</p>
        <br />
        <button
          className="bg-blue-300 text-gray-900 px-4 py-2 rounded-lg font-semibold text-xl flex justify-center hover:bg-blue-200"
          style={{ height: 50, width: 200 }}
        >
          <Link href="/newblogs" legacyBehavior>
            <a>More on Blogs &gt;&gt;</a>
          </Link>
        </button>
      </div>
      <Footer />
    </>
  );
};

export default BlogSection;
