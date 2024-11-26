import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Image from "next/image";
import Navbar from "../components/NavbarLogo"; // Assuming you have a Navbar component
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
  const t = useTranslations("product");
  // Contact form state
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [emailContact, setEmailContact] = useState("");
  const [phone, setPhone] = useState("");
  const [residence, setResidence] = useState("");
  const [reason, setReason] = useState("");
  const [comment, setComment] = useState("");
  const [contactPref, setContactPref] = useState("");
  const [contactTime, setContactTime] = useState("");
  const [funeralPref, setFuneralPref] = useState("");

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
            `http://localhost:1337/api/products/${document_id}?populate=logo`
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

  const handleFormSubmit = async () => {
    const data = {
      firstname: firstName,
      surname,
      email: emailContact, // Fix: Make sure you're using 'emailContact' to match your form state
      phone,
      residence,
      reason,
      comment,
      contact_pref: contactPref,
      contact_time: contactTime,
      funeral_pref: funeralPref,
      title: title,
    };

    try {
      const response = await axios.post("http://localhost:1337/api/contacts", {
        data,
      });

      // On success, show a confirmation alert
      alert("Your form has been submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <Navbar />
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
                <span>{t("top_section.no_image")}</span>
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
              {t("description_section.description_heading")}
            </h2>
            <p className="text-lg text-gray-700 mb-4">{description}</p>
            <h3 className="text-xl font-semibold mb-2">
              {t("description_section.services_heading")}
            </h3>
            <p className="text-lg text-gray-700">{services}</p>
            <p className="text-lg text-gray-700">
              {t("description_section.contact")}: {contact}
            </p>
            <p className="text-lg text-gray-700">
              {t("description_section.city_postal_code")}: {code}
            </p>
          </div>
          <hr />
          <br />

          {/* Essential Information Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4">
              {t("essential_information_section.essential_information_heading")}
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
                {t("essential_information_section.guests_heading")}
              </h3>
              <p className="text-lg text-gray-700">{guests}</p>
              <h3 className="text-xl font-semibold mb-2">
                {t("essential_information_section.location_heading")}
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
                  {t("essential_information_section.facilities_heading")}
                </h3>
                <ul className="list-disc pl-6 text-lg text-gray-700">
                  {facilities.split(",").map((facility, index) => (
                    <li key={index}>{facility}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  {t("essential_information_section.transport_heading")}
                </h3>
                <ul className="list-disc pl-6 text-lg text-gray-700">
                  {transport.split(",").map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  {t("essential_information_section.coffin_options_heading")}
                </h3>
                <ul className="list-disc pl-6 text-lg text-gray-700">
                  {coffin.split(",").map((option, index) => (
                    <li key={index}>{option}</li>
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
                {t("essential_information_section.contact_information_heading")}
              </h2>
              <p className="text-lg text-gray-700">
                {t("essential_information_section.email")}: {email}
              </p>
              <p className="text-lg text-gray-700">
                {t("essential_information_section.price")}: {price}
              </p>
              <p className="text-lg text-gray-700">
                {t("essential_information_section.headstone_monuments")}:{" "}
                {headstone_monuments}
              </p>
            </div>
          </div>
          {/* Heading Section */}
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
              {t("contact_section.contact_heading")}
            </h2>
            <p className="text-xl text-center text-gray-600 mb-6">
              {t("contact_section.contact_description")}
            </p>
            <div className="flex justify-center mb-6">
              <Image
                src="/icons/phone.png"
                alt="Phone"
                width={40}
                height={40}
              />
              <Image
                src="/icons/email.png"
                alt="Email"
                width={40}
                height={40}
                className="ml-4"
              />
            </div>
          </div>

          {/* Registration Form */}
          <div className="bg-blue-50 p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-6">
              {t("registration_form.registration_form_heading")}
            </h3>

            <form
              onSubmit={(e) => {
                e.preventDefault(); // Prevent the form's default behavior
                handleFormSubmit(); // Handle the form submission manually
              }}
            >
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="firstName"
                  >
                    {t("registration_form.first_name")}
                  </label>
                  <input
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    id="firstName"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="surname"
                  >
                    {t("registration_form.surname")}
                  </label>
                  <input
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    id="surname"
                    type="text"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="email"
                  >
                    {t("registration_form.email_address")}
                  </label>
                  <input
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    id="email"
                    type="email"
                    value={emailContact}
                    onChange={(e) => setEmailContact(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="phone"
                  >
                    {t("registration_form.phone_number")}
                  </label>
                  <input
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    id="phone"
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="residence"
                >
                  {t("registration_form.city_of_residence")}
                </label>
                <input
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  id="residence"
                  type="text"
                  value={residence}
                  onChange={(e) => setResidence(e.target.value)}
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="reason"
                >
                  {t("registration_form.reason_for_contact")}
                </label>
                <input
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  id="reason"
                  type="text"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  required
                />
              </div>

              <div className="mb-6">
                <h4 className="font-bold mb-2">
                  {t("registration_form.contact_preferences")}
                </h4>
                <div className="flex items-center mb-2">
                  <input
                    id="contact-phone"
                    type="radio"
                    name="contact_pref"
                    value="Phone"
                    onChange={(e) => setContactPref(e.target.value)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-2"
                    required
                  />
                  <label htmlFor="contact-phone" className="text-gray-700">
                    {t("registration_form.phone")}
                  </label>
                </div>
                <div className="flex items-center mb-2">
                  <input
                    id="contact-email"
                    type="radio"
                    name="contact_pref"
                    value="Email"
                    onChange={(e) => setContactPref(e.target.value)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-2"
                  />
                  <label htmlFor="contact-email" className="text-gray-700">
                    {t("registration_form.email")}
                  </label>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-bold mb-2">
                  {t("registration_form.preferred_contact_time")}
                </h4>
                <div className="flex items-center mb-2">
                  <input
                    id="morning"
                    type="checkbox"
                    value="Morning"
                    onChange={(e) => setContactTime("Morning")}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-2"
                  />
                  <label htmlFor="morning" className="text-gray-700">
                    {t("registration_form.morning")}
                  </label>
                </div>
                <div className="flex items-center mb-2">
                  <input
                    id="afternoon"
                    type="checkbox"
                    value="Afternoon"
                    onChange={(e) => setContactTime("Afternoon")}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-2"
                  />
                  <label htmlFor="afternoon" className="text-gray-700">
                    {t("registration_form.afternoon")}
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="evening"
                    type="checkbox"
                    value="Evening"
                    onChange={(e) => setContactTime("Evening")}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-2"
                  />
                  <label htmlFor="evening" className="text-gray-700">
                    {t("registration_form.evening")}
                  </label>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-bold mb-2">
                  {t("registration_form.funeral_preferences")}
                </h4>
                <div className="flex items-center mb-2">
                  <input
                    id="funeral"
                    type="radio"
                    name="funeral_pref"
                    value="Funeral"
                    onChange={(e) => setFuneralPref(e.target.value)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-2"
                  />
                  <label htmlFor="funeral" className="text-gray-700">
                    {t("registration_form.funeral")}
                  </label>
                </div>
                <div className="flex items-center mb-2">
                  <input
                    id="cremation"
                    type="radio"
                    name="funeral_pref"
                    value="Cremation"
                    onChange={(e) => setFuneralPref(e.target.value)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-2"
                  />
                  <label htmlFor="cremation" className="text-gray-700">
                    {t("registration_form.cremation")}
                  </label>
                </div>
                <div className="flex items-center mb-2">
                  <input
                    id="eco-funeral"
                    type="radio"
                    name="funeral_pref"
                    value="Eco-funeral"
                    onChange={(e) => setFuneralPref(e.target.value)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-2"
                  />
                  <label htmlFor="eco-funeral" className="text-gray-700">
                    {t("registration_form.eco_friendly_funeral")}
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="non-religious"
                    type="radio"
                    name="funeral_pref"
                    value="Non-religious"
                    onChange={(e) => setFuneralPref(e.target.value)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-2"
                  />
                  <label htmlFor="non-religious" className="text-gray-700">
                    {t("registration_form.non_religious_funeral")}
                  </label>
                </div>
                <div className="flex items-center mb-4">
                  <input
                    id="religious"
                    type="radio"
                    name="funeral_pref"
                    value="Religious"
                    onChange={(e) => setFuneralPref(e.target.value)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-2"
                  />
                  <label htmlFor="religious" className="text-gray-700">
                    {t("registration_form.religious_funeral")}
                  </label>
                  <input
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 mt-2"
                    id="religious-funeral-specify"
                    type="text"
                    placeholder={t("registration_form.specify_religion")}
                  />
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-bold mb-2">
                  {t("registration_form.additional_comments")}
                </h4>
                <textarea
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder={t("registration_form.add_comments")}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                >
                  {t("registration_form.send")}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductPage;
