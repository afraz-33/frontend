import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Navbar from "../components/Navbar";
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
      thumbnail: {
        url: string;
      };
    };
  };
}

const ProductDetail = () => {
  const t = useTranslations("productDetail");

  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [services, setServices] = useState("");
  const [contact, setContact] = useState("");
  const [type, setType] = useState("");
  const [funeralType, setFuneralType] = useState("");
  const [payment, setPayment] = useState("");
  const [arrangements, setArrangements] = useState("");
  const [guests, setGuests] = useState("");
  const [location, setLocation] = useState("");
  const [funeralLocation, setFuneralLocation] = useState("");
  const [facilities, setFacilities] = useState("");
  const [transport, setTransport] = useState("");
  const [coffin, setCoffin] = useState("");
  const [price, setPrice] = useState("");
  const [headstoneMonuments, setHeadstoneMonuments] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const document_id =
    typeof window !== "undefined" ? localStorage.getItem("id") : null;

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
          const productData = res.data.data.attributes;
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
        } catch (error) {
          console.error("Error fetching product details:", error);
        }
      };
      fetchProduct();
    }
  }, [document_id]);

  const handleUpdateProduct = async () => {
    if (!title || !description || !services || !contact) {
      alert("All fields are mandatory.");
      return;
    }

    try {
      let imageId = null;

      if (file) {
        const formData = new FormData();
        formData.append("files", file);
        const uploadResponse = await axios.post(
          "http://localhost:1337/api/upload",
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        imageId = uploadResponse.data[0].id;
      }

      const data = {
        title,
        description,
        services,
        contact,
        type,
        funeral_type: funeralType,
        payment,
        arrangements,
        guests,
        location,
        funeral_location: funeralLocation,
        facilities,
        transport,
        coffin,
        price,
        headstone_monuments: headstoneMonuments,
        email,
        code,
        logo: imageId,
      };

      await axios.put(
        `http://localhost:1337/api/products/${document_id}`,
        { data },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      alert("Product updated successfully!");
      router.push("/dashboard");
    } catch (error) {
      alert("Failed to update product.");
      console.error("Error updating product:", error);
    }
  };

  const handleDeleteProduct = async () => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmation) {
      return;
    }

    try {
      await axios.delete(`http://localhost:1337/api/products/${document_id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      alert("Product deleted successfully!");
      router.push("/dashboard");
    } catch (error) {
      alert("Failed to delete product.");
      console.error("Error deleting product:", error);
    }
  };

  return (
    <>
      <Navbar showAddProduct={false} />
      <div className="container mx-auto p-4">
        {product ? (
          <div>
            <h1 className="text-2xl font-bold mb-4">{t("editProduct")}</h1>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t("titlePlaceholder")}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              required
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t("descriptionPlaceholder")}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              required
            />
            <input
              type="text"
              value={services}
              onChange={(e) => setServices(e.target.value)}
              placeholder={t("servicesPlaceholder")}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              required
            />
            <input
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder={t("contactPlaceholder")}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              required
            />
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder={t("codePlaceholder")}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              required
            />
            <label htmlFor="type">{t("typeLabel")}</label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              required
            >
              <option value="">{t("selectTypeOption")}</option>
              <option value="Buying">{t("buyingOption")}</option>
              <option value="Cremation">{t("cremationOption")}</option>
            </select>
            <label htmlFor="funeralType">{t("funeralTypeLabel")}</label>
            <select
              id="funeralType"
              value={funeralType}
              onChange={(e) => setFuneralType(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              required
            >
              <option value="">{t("selectFuneralTypeOption")}</option>
              <option value="Traditional Funeral">
                {t("traditionalFuneralOption")}
              </option>
              <option value="Church Funeral">{t("churchFuneralOption")}</option>
              <option value="Non-religious Burial">
                {t("nonReligiousBurialOption")}
              </option>
              <option value="Nature Burial">{t("natureBurialOption")}</option>
              <option value="Eco Funeral">{t("ecoFuneralOption")}</option>
            </select>
            <label htmlFor="payment">{t("paymentLabel")}</label>
            <select
              id="payment"
              value={payment}
              onChange={(e) => setPayment(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              required
            >
              <option value="">{t("selectPaymentOption")}</option>
              <option value="Prepayment">{t("prepaymentOption")}</option>
              <option value="Payment in Installments">
                {t("paymentInInstallmentsOption")}
              </option>
            </select>
            <label htmlFor="arrangements">{t("arrangementsLabel")}</label>
            <select
              id="arrangements"
              value={arrangements}
              onChange={(e) => setArrangements(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              required
            >
              <option value="">{t("selectArrangementsOption")}</option>
              <option value="Home Confinement">
                {t("homeConfinementOption")}
              </option>
              <option value="Return to Country of Origin">
                {t("returnToCountryOption")}
              </option>
              <option value="Seaman’s Funeral">
                {t("seamansFuneralOption")}
              </option>
              <option value="Direct Cremation or Burial">
                {t("directCremationOption")}
              </option>
              <option value="Military Funeral Services">
                {t("militaryFuneralOption")}
              </option>
              <option value="Children’s Funerals">
                {t("childrensFuneralOption")}
              </option>
            </select>
            <label htmlFor="location">{t("locationLabel")}</label>
            <select
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              required
            >
              <option value="">{t("selectLocationOption")}</option>
              <option value="Accessibility of public transport">
                {t("accessibilityPublicTransport")}
              </option>
              <option value="Parking Facilities">
                {t("parkingFacilitiesOption")}
              </option>
              <option value="Quiet Environment">
                {t("quietEnvironmentOption")}
              </option>
              <option value="Urban Location">{t("urbanLocationOption")}</option>
            </select>
            <label htmlFor="funeralLocation">{t("funeralLocationLabel")}</label>
            <select
              id="funeralLocation"
              value={funeralLocation}
              onChange={(e) => setFuneralLocation(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              required
            >
              <option value="">{t("selectFuneralLocationOption")}</option>
              <option value="Church or religious building">
                {t("churchLocationOption")}
              </option>
              <option value="Funeral home with its own cemetery">
                {t("funeralHomeCemeteryOption")}
              </option>
              <option value="Outdoor Location">
                {t("outdoorLocationOption")}
              </option>
              <option value="Specific Cemetery in the neighbourhood">
                {t("specificCemeteryOption")}
              </option>
            </select>
            <label htmlFor="facilities">{t("facilitiesLabel")}</label>
            <select
              id="facilities"
              value={facilities}
              onChange={(e) => setFacilities(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              required
            >
              <option value="">{t("selectFacilityTypeOption")}</option>
              <option value="Auditorium for ceremony">
                {t("auditoriumForCeremonyOption")}
              </option>
              <option value="Funeral room(s)">{t("funeralRoomOption")}</option>
              <option value="24 hour room(s)">
                {t("twentyFourHourRoomOption")}
              </option>
              <option value="Condolence room(s)">
                {t("condolenceRoomOption")}
              </option>
              <option value="Possibility for reception">
                {t("possibilityForReceptionOption")}
              </option>
              <option value="Family room">{t("familyRoomOption")}</option>
            </select>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder={t("pricePlaceholder")}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
            <label htmlFor="headstone">{t("headstoneLabel")}</label>
            <select
              id="headstone"
              value={headstoneMonuments}
              onChange={(e) => setHeadstoneMonuments(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              required
            >
              <option value="">{t("selectMonumentOption")}</option>
              <option value="Choice of different types of headstones">
                {t("headstoneOption1")}
              </option>
              <option value="Possibility of personalised tombstones">
                {t("headstoneOption2")}
              </option>
              <option value="Green or natural grave markers">
                {t("headstoneOption3")}
              </option>
            </select>
            <input
              type="number"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              placeholder="Guests"
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-2 border border-gray-300 rounded mb-4"
              required
            />
            <input
              type="file"
              onChange={(e) =>
                setFile(e.target.files ? e.target.files[0] : null)
              }
              className="w-full p-2 mb-4"
            />

            <div className="flex justify-between">
              <button
                onClick={handleUpdateProduct}
                className="bg-green-500 text-white p-2 rounded"
              >
                {t("saveChangesButton")}
              </button>
              <button
                onClick={handleDeleteProduct}
                className="bg-red-500 text-white p-2 rounded"
              >
                {t("deleteProductButton")}
              </button>
            </div>
          </div>
        ) : (
          <p> {t("loadingProductDetails")}</p>
        )}
      </div>
    </>
  );
};

export default ProductDetail;
