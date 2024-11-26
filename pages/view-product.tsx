import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Image from "next/image";
import Navbar from "../components/Navbar"; // Assuming you have a Navbar component
import { set } from "react-hook-form";
import { useSearchParams } from "next/navigation";
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

interface Product {
  documentId: string;
  title: string;
  description: string;
  services: string;
  contact: string;
  type: string;
  funeral_type: string;
  payment: string;
  arrangements: string;
  guests: string;
  location: string;
  funeral_location: string;
  facilities: string;
  transport: string;
  coffin: string;
  price: string;
  headstone_monuments: string;
  email: string;
  code: string;
  logo: {
    formats: {
      large?: {
        url: string;
      };
      medium?: {
        url: string;
      };
      small?: {
        url: string;
      };
      thumbnail?: {
        url: string;
      };
    };
    url?: string; // Original URL in case formats are missing
  };
}

const ProductPage = () => {
  const t = useTranslations("view-product");

  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [services, setServices] = useState("");
  const [contact, setContact] = useState("");
  const [type, setType] = useState("");
  const [funeral_type, setFuneralType] = useState("");
  const [payment, setPayment] = useState("");
  const [arrangements, setArrangements] = useState("");
  const [guests, setGuests] = useState("");
  const [location, setLocation] = useState("");
  const [funeral_location, setFuneralLocation] = useState("");
  const [facilities, setFacilities] = useState("");
  const [transport, setTransport] = useState("");
  const [coffin, setCoffin] = useState("");
  const [price, setPrice] = useState("");
  const [headstone_monuments, setHeadstoneMonuments] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [file, setFile] = useState(null);
  const [documentId, setdocumentId] = useState(null);
  const searchParams = useSearchParams(); // This replaces router.query

  const document_id = searchParams?.get("document_id") ?? "";

  useEffect(() => {
    if (document_id) {
      const fetchProduct = async () => {
        try {
          const res = await axios.get(
            `http://localhost:1337/api/products/${document_id}?populate=logo`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          setProduct(res.data.data);
          const productData = res.data.data;
          setTitle(productData.title);
          setDescription(productData.description);
          setServices(productData.services);
          setContact(productData.contact);
          setType(productData.type);
          setFuneralType(productData.funeral_type);
          setPayment(productData.payment);
          setArrangements(productData.arrangements);
          setGuests(productData.guests);
          setLocation(productData.location);
          setFuneralLocation(productData.funeral_location);
          setFacilities(productData.facilities);
          setTransport(productData.transport);
          setCoffin(productData.coffin);
          setPrice(productData.price);
          setHeadstoneMonuments(productData.headstone_monuments);
          setEmail(productData.email);
          setCode(productData.code);
          setdocumentId(productData.documentId);
        } catch (error) {
          console.error("Error fetching product details:", error);
        }
      };
      fetchProduct();
    }
  }, [document_id]);

  return (
    <>
      <Navbar showAddProduct={false} />
      <section className="bg-white py-2">
        <div className="container mx-auto px-2">
          {/* Top Section */}
          <div className="w-full flex justify-center mb-8">
            {product?.logo?.formats?.large?.url ? (
              <Image
                src={`http://localhost:1337${product.logo.url}`}
                alt={title}
                width={900}
                height={500}
                className="rounded-lg"
              />
            ) : (
              <div className="w-64 h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                <span>{t("productPage.messages.noImageAvailable")}</span>
              </div>
            )}
          </div>

          {/* Description Section */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold mt-4 md:mt-0">{title}</h1>
            <br />
            <hr />
            <br />
            <h2 className="text-2xl font-bold mb-4">
              {t("productPage.sections.description.heading")}
            </h2>
            <p className="text-lg text-gray-700 mb-4">{description}</p>
            <h3 className="text-xl font-semibold mb-2">
              {t("productPage.sections.description.services")}
            </h3>
            <p className="text-lg text-gray-700">{services}</p>
            <p className="text-lg text-gray-700">
              {t("productPage.sections.description.contact")}: {contact}
            </p>
            <p className="text-lg text-gray-700">
              {t("productPage.sections.description.cityPostalCode")}: {code}
            </p>
          </div>
          <hr />
          <br />

          {/* Essential Information Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4">
              {t("productPage.sections.essentialInformation.heading")}
            </h2>
            <div className="flex space-x-4 mb-6">
              <button className="py-2 px-4 bg-blue-100 text-blue-800 rounded-lg focus:outline-none">
                {funeral_type}
              </button>
              <button className="py-2 px-4 bg-gray-100 text-gray-800 rounded-lg focus:outline-none">
                {type}
              </button>
            </div>
            <p className="text-lg text-gray-700">{payment}</p>
            <p className="text-lg text-gray-700">{arrangements}</p>
            <br />
            <hr />
            <br />

            {/* Other Sections */}
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2">
                {t("productPage.sections.otherSections.guests")}
              </h3>
              <p className="text-lg text-gray-700">{guests}</p>
              <h3 className="text-xl font-semibold mb-2">
                {t("productPage.sections.otherSections.location")}
              </h3>
              <p className="text-lg text-gray-700">{location}</p>
              <p className="text-lg text-gray-700">{funeral_location}</p>
            </div>
            <br />
            <hr />
            <br />

            {/* Facilities Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  {t("productPage.sections.facilities.heading")}
                </h3>
                <ul className="list-disc pl-6 text-lg text-gray-700">
                  {facilities.split(",").map((facility, index) => (
                    <li key={index}>{facility.trim()}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  {t("productPage.sections.facilities.transport")}
                </h3>
                <ul className="list-disc pl-6 text-lg text-gray-700">
                  {transport.split(",").map((item, index) => (
                    <li key={index}>{item.trim()}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  {t("productPage.sections.facilities.coffinOptions")}
                </h3>
                <ul className="list-disc pl-6 text-lg text-gray-700">
                  {coffin.split(",").map((option, index) => (
                    <li key={index}>{option.trim()}</li>
                  ))}
                </ul>
              </div>
            </div>
            <br />
            <hr />
            <br />

            {/* Contact Section */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4">
                {t("productPage.sections.contactInformation.heading")}
              </h2>
              <p className="text-lg text-gray-700">
                {t("productPage.sections.contactInformation.email")}: {email}
              </p>
              <p className="text-lg text-gray-700">
                {t("productPage.sections.contactInformation.price")}: {price}
              </p>
              <p className="text-lg text-gray-700">
                {t(
                  "productPage.sections.contactInformation.headstoneMonuments"
                )}
                : {headstone_monuments}
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className="flex justify-center">
        <button
          className="text-xl bg-blue-600 text-white px-20 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          onClick={() => {
            router.push(`/productdetail?document_id=${product?.documentId}`); // Navigate to product detail
          }}
        >
          {t("productPage.buttons.edit")}
        </button>
      </div>
      <br />
      <br />
      <br />
    </>
  );
};

export default ProductPage;
