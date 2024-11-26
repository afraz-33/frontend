"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/NavbarLogo";
import "../src/app/globals.css";
import SearchIcon from "@mui/icons-material/Search";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import Footer from "../components/footer";
import { useTranslations } from "use-intl";

// import { useFormatter } from "next-intl";

// Define interfaces for type safety
interface FilterOptions {
  type: string;
  priceRange: [number, number];
  location: string;
  funeral_type?: string;
  payment?: string;
  arrangements?: string;
  guests?: string;
  funeral_location?: string;
  facilities?: string;
  transport?: string;
  coffin?: string;
  headstone_monuments?: string;
  code: string;
}

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
  documentId?: string;
  title?: string; // Made optional to prevent errors
  description?: string; // Made optional
  logo?: {
    formats?: {
      large?: {
        url?: string; // Made optional
      };
    };
  };
  price?: number;
  guests?: string;
  location?: string;
  type?: string;
}
const BurialCremationPage = () => {
  const searchParams = useSearchParams(); // This replaces router.query
  const type = searchParams?.get("type") ?? "Burying"; // Use a fallback value if 'type' is missing
  const code = searchParams?.get("code") ?? "";

  const [filters, setFilters] = useState<FilterOptions>({
    type: "Cremation",
    priceRange: [50, 10000],
    location: "",
    funeral_type: "",
    payment: "",
    arrangements: "",
    guests: "",
    facilities: "",
    transport: "",
    coffin: "",
    headstone_monuments: "",
    code: "",
  });

  const router = useRouter();

  // const format = useFormatter();

  const [searchTerm, setSearchTerm] = useState("");

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handlePriceChange = (index: number, value: string) => {
    const updatedPriceRange = [...filters.priceRange] as [number, number];
    updatedPriceRange[index] = Number(value);
    setFilters({ ...filters, priceRange: updatedPriceRange });
  };

  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    setFilters({ ...filters, [key]: value });
  };
  const handleSearch = () => {
    handleFilterChange("code", searchTerm); // Only updates the 'code' filter when the button is clicked
  };

  const fetchProducts = async () => {
    setLoading(true);

    // Prepare query params, excluding empty fields
    const queryParams: Record<string, string | undefined> = {
      type: filters.type,
      location: filters.location || undefined,
      price: `${filters.priceRange[0]}-${filters.priceRange[1]}`,
      guests: filters.guests || undefined,
      funeral_type: filters.funeral_type || undefined,
      payment: filters.payment || undefined,
      arrangements: filters.arrangements || undefined,
      facilities: filters.facilities || undefined,
      transport: filters.transport || undefined,
      coffin: filters.coffin || undefined,
      headstone_monuments: filters.headstone_monuments || undefined,
      code: filters.code || undefined,
    };

    try {
      const response = await axios.get(
        "http://localhost:1337/api/products/search",
        {
          params: queryParams,
        }
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (type || code) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        type: (type as string) || prevFilters.type,
        code: (code as string) || prevFilters.code,
      }));
      setSearchTerm((code as string) || ""); // Update the search input value
    }
  }, [type, code]);

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const handleMapView = () => {
    router.push("/map-view"); // Navigate to the map page
  };

  const t = useTranslations("burialPage");
  return (
    <>
      <Navbar />
      <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
        {/* Sidebar for Filters */}
        <div className="w-full lg:w-1/4 p-6 bg-white shadow-lg">
          <h2 className="text-lg font-semibold mb-4">{t("filters")}</h2>

          {/* Burial or Cremation Type */}
          <div className="mb-4">
            <div className="flex gap-4 items-center">
              <button
                className={`p-2 text-sm rounded ${
                  filters.type === "Burying"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => handleFilterChange("type", "Burying")}
              >
                {t("burying")}
              </button>
              <button
                className={`p-2 text-sm rounded ${
                  filters.type === "Cremation"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => handleFilterChange("type", "Cremation")}
              >
                {t("cremation")}
              </button>
            </div>
          </div>

          {/* Payment Options */}
          <div className="mb-4">
            <h3 className="text-sm font-semibold mb-2">
              {t("payment_options")}
            </h3>
            <ul className="text-sm">
              <li>
                <input
                  type="radio"
                  id="payment-prepayment"
                  name="payment"
                  className="mr-2"
                  onChange={() => handleFilterChange("payment", "Prepayment")}
                />
                <label htmlFor="payment-prepayment">{t("prepayment")}</label>
              </li>
              <li>
                <input
                  type="radio"
                  id="payment-installments"
                  name="payment"
                  className="mr-2"
                  onChange={() =>
                    handleFilterChange("payment", "Payment in Installments")
                  }
                />
                <label htmlFor="payment-installments">
                  {t("payment_in_installments")}
                </label>
              </li>
            </ul>
          </div>

          {/* Guests */}
          <div className="mb-4">
            <h3 className="text-sm font-semibold mb-2">
              {t("number_of_guests")}
            </h3>
            <ul className="text-sm">
              <li>
                <input
                  type="radio"
                  id="guests-less-50"
                  name="guests"
                  className="mr-2"
                  onChange={() => handleFilterChange("guests", "<50")}
                />
                <label htmlFor="guests-less-50">&lt; 50</label>
              </li>
              <li>
                <input
                  type="radio"
                  id="guests-50-100"
                  name="guests"
                  className="mr-2"
                  onChange={() => handleFilterChange("guests", "50-100")}
                />
                <label htmlFor="guests-50-100">50 to 100</label>
              </li>
              <li>
                <input
                  type="radio"
                  id="guests-more-150"
                  name="guests"
                  className="mr-2"
                  onChange={() => handleFilterChange("guests", ">150")}
                />
                <label htmlFor="guests-more-150">&gt; 150</label>
              </li>
            </ul>
          </div>

          {/* Location */}
          <div className="mb-4">
            <h3 className="text-sm font-semibold mb-2">{t("location")}</h3>
            <ul className="text-sm">
              <li>
                <input
                  type="radio"
                  id="location-public-transport"
                  name="guests"
                  className="mr-2"
                  onChange={() =>
                    handleFilterChange(
                      "location",
                      "Accessibility of public transport"
                    )
                  }
                />
                <label htmlFor="location-public-transport">
                  {t("public_transport_accessibility")}
                </label>
              </li>
              <li>
                <input
                  type="radio"
                  id="location-parking-facilities"
                  name="guests"
                  className="mr-2"
                  onChange={() =>
                    handleFilterChange("location", "Parking Facilities")
                  }
                />
                <label htmlFor="location-parking-facilities">
                  {t("parking_facilities")}
                </label>
              </li>
              <li>
                <input
                  type="radio"
                  id="location-quiet-environment"
                  name="guests"
                  className="mr-2"
                  onChange={() =>
                    handleFilterChange("location", "Quiet Environment")
                  }
                />
                <label htmlFor="location-quiet-environment">
                  {t("quiet_environment")}
                </label>
              </li>
              <li>
                <input
                  type="radio"
                  id="location-urban"
                  name="guests"
                  className="mr-2"
                  onChange={() =>
                    handleFilterChange("location", "Urban Location")
                  }
                />
                <label htmlFor="location-urban">{t("urban_location")}</label>
              </li>
            </ul>
          </div>

          {/* Funeral Location */}
          <div className="mb-4">
            <h3 className="text-sm font-semibold mb-2">
              {t("funeral_location")}
            </h3>
            <ul className="text-sm">
              <li>
                <input
                  type="radio"
                  id="funeral_location-church"
                  name="funeral_location"
                  className="mr-2"
                  onChange={() =>
                    handleFilterChange(
                      "funeral_location",
                      "Church or religious building"
                    )
                  }
                />
                <label htmlFor="funeral_location-church">
                  {t("church_or_religious_building")}
                </label>
              </li>
              <li>
                <input
                  type="radio"
                  id="funeral_location-funeral-home"
                  name="funeral_location"
                  className="mr-2"
                  onChange={() =>
                    handleFilterChange(
                      "funeral_location",
                      "Funeral home with its own cemetery"
                    )
                  }
                />
                <label htmlFor="funeral_location-funeral-home">
                  {t("funeral_home_with_private_cemetery")}
                </label>
              </li>
              <li>
                <input
                  type="radio"
                  id="funeral_location-outdoor"
                  name="funeral_location"
                  className="mr-2"
                  onChange={() =>
                    handleFilterChange("funeral_location", "Outdoor Location")
                  }
                />
                <label htmlFor="funeral_location-outdoor">
                  {t("outdoor_location")}
                </label>
              </li>
              <li>
                <input
                  type="radio"
                  id="funeral_location-specific-cemetery"
                  name="funeral_location"
                  className="mr-2"
                  onChange={() =>
                    handleFilterChange(
                      "funeral_location",
                      "Specific Cemetery in the neighbourhood"
                    )
                  }
                />
                <label htmlFor="funeral_location-specific-cemetery">
                  {t("specific_cemetery_in_the_neighbourhood")}
                </label>
              </li>
            </ul>
          </div>

          {/* Special Funeral Arrangements */}
          <div className="mb-4">
            <h3 className="text-sm font-semibold mb-2">
              {t("special_funeral_arrangements")}
            </h3>
            <ul className="text-sm">
              <li>
                <input
                  type="radio"
                  id="arrangements-home-confinement"
                  name="arrangements"
                  className="mr-2"
                  onChange={() =>
                    handleFilterChange("arrangements", "Home Confinement")
                  }
                />
                <label htmlFor="arrangements-home-confinement">
                  {t("home_confinement")}
                </label>
              </li>
              <li>
                <input
                  type="radio"
                  id="arrangements-return-country"
                  name="arrangements"
                  className="mr-2"
                  onChange={() =>
                    handleFilterChange(
                      "arrangements",
                      "Return to Country of Origin"
                    )
                  }
                />
                <label htmlFor="arrangements-return-country">
                  {t("return_to_country_of_origin")}
                </label>
              </li>
              <li>
                <input
                  type="radio"
                  id="arrangements-seamans-funeral"
                  name="arrangements"
                  className="mr-2"
                  onChange={() =>
                    handleFilterChange("arrangements", "Seaman’s Funeral")
                  }
                />
                <label htmlFor="arrangements-seamans-funeral">
                  {t("seamans_funeral")}
                </label>
              </li>
              <li>
                <input
                  type="radio"
                  id="arrangements-direct-cremation"
                  name="arrangements"
                  className="mr-2"
                  onChange={() =>
                    handleFilterChange(
                      "arrangements",
                      "Direct Cremation or Burial"
                    )
                  }
                />
                <label htmlFor="arrangements-direct-cremation">
                  {t("direct_cremation_or_burial")}
                </label>
              </li>
              <li>
                <input
                  type="radio"
                  id="arrangements-military-funeral"
                  name="arrangements"
                  className="mr-2"
                  onChange={() =>
                    handleFilterChange(
                      "arrangements",
                      "Military Funeral Services"
                    )
                  }
                />
                <label htmlFor="arrangements-military-funeral">
                  {t("military_funeral_services")}
                </label>
              </li>
              <li>
                <input
                  type="radio"
                  id="arrangements-childrens-funerals"
                  name="arrangements"
                  className="mr-2"
                  onChange={() =>
                    handleFilterChange("arrangements", "Children’s Funerals")
                  }
                />
                <label htmlFor="arrangements-childrens-funerals">
                  {t("childrens_funerals")}
                </label>
              </li>
            </ul>
          </div>

          {/* Facilities */}
          <div className="mb-4">
            <h3 className="text-sm font-semibold mb-2">
              {t("type_of_facilities")}
            </h3>
            <ul className="text-sm">
              <li>
                <input
                  type="radio"
                  id="facilities-auditorium"
                  name="facilities"
                  className="mr-2"
                  onChange={() =>
                    handleFilterChange("facilities", "Auditorium for ceremony")
                  }
                />
                <label htmlFor="facilities-auditorium">
                  {t("auditorium_for_ceremony")}
                </label>
              </li>
              <li>
                <input
                  type="radio"
                  id="facilities-funeral-room"
                  name="facilities"
                  className="mr-2"
                  onChange={() =>
                    handleFilterChange("facilities", "Funeral Room")
                  }
                />
                <label htmlFor="facilities-funeral-room">
                  {t("funeral_rooms")}
                </label>
              </li>
              <li>
                <input
                  type="radio"
                  id="facilities-24-hour-room"
                  name="facilities"
                  className="mr-2"
                  onChange={() =>
                    handleFilterChange("facilities", "24 hour room")
                  }
                />
                <label htmlFor="facilities-24-hour-room">
                  {t("24_hour_rooms")}
                </label>
              </li>
              <li>
                <input
                  type="radio"
                  id="facilities-condolence-room"
                  name="facilities"
                  className="mr-2"
                  onChange={() =>
                    handleFilterChange("facilities", "Condolence room")
                  }
                />
                <label htmlFor="facilities-condolence-room">
                  {t("condolence_rooms")}
                </label>
              </li>
              <li>
                <input
                  type="radio"
                  id="facilities-reception"
                  name="facilities"
                  className="mr-2"
                  onChange={() =>
                    handleFilterChange(
                      "facilities",
                      "Possibility for reception"
                    )
                  }
                />
                <label htmlFor="facilities-reception">
                  {t("possibility_for_reception")}
                </label>
              </li>
              <li>
                <input
                  type="radio"
                  id="facilities-family-room"
                  name="facilities"
                  className="mr-2"
                  onChange={() =>
                    handleFilterChange("facilities", "Family room")
                  }
                />
                <label htmlFor="facilities-family-room">
                  {t("family_room")}
                </label>
              </li>
            </ul>
          </div>

          {/* Transport */}
          <div className="mb-4">
            <h3 className="text-sm font-semibold mb-2">{t("transport")}</h3>
            <ul className="text-sm">
              <li>
                <input
                  type="radio"
                  id="transport-funeral-car"
                  name="transport"
                  className="mr-2"
                  onChange={() =>
                    handleFilterChange("transport", "Funeral car")
                  }
                />
                <label htmlFor="transport-funeral-car">
                  {t("transport_car")}
                </label>
              </li>
              <li>
                <input
                  type="radio"
                  id="transport-special"
                  name="transport"
                  className="mr-2"
                  onChange={() =>
                    handleFilterChange("transport", "Special Transport")
                  }
                />
                <label htmlFor="transport-special">
                  {t("special_transport")}
                </label>
              </li>
              <li>
                <input
                  type="radio"
                  id="transport-family"
                  name="transport"
                  className="mr-2"
                  onChange={() =>
                    handleFilterChange("transport", "Family Transport")
                  }
                />
                <label htmlFor="transport-family">
                  {t("family_transport")}
                </label>
              </li>
            </ul>
          </div>

          {/* Coffin Options */}
          <div className="mb-4">
            <h3 className="text-sm font-semibold mb-2">
              {t("coffin_options")}
            </h3>
            <ul className="text-sm">
              <li>
                <input
                  type="radio"
                  id="coffin-traditional"
                  name="coffin"
                  className="mr-2"
                  onChange={() =>
                    handleFilterChange("coffin", "Traditional wooden coffin")
                  }
                />
                <label htmlFor="coffin-traditional">
                  {t("traditional_wooden_coffin")}
                </label>
              </li>
              <li>
                <input
                  type="radio"
                  id="coffin-biodegradable"
                  name="coffin"
                  className="mr-2"
                  onChange={() =>
                    handleFilterChange("coffin", "Biodegradable coffin")
                  }
                />
                <label htmlFor="coffin-biodegradable">
                  {t("biodegradable_coffin")}
                </label>
              </li>
              <li>
                <input
                  type="radio"
                  id="coffin-personalized"
                  name="coffin"
                  className="mr-2"
                  onChange={() =>
                    handleFilterChange("coffin", "Personalized coffin")
                  }
                />
                <label htmlFor="coffin-personalized">
                  {t("personalized_coffin")}
                </label>
              </li>
              <li>
                <input
                  type="radio"
                  id="coffin-luxury"
                  name="coffin"
                  className="mr-2"
                  onChange={() => handleFilterChange("coffin", "Luxury coffin")}
                />
                <label htmlFor="coffin-luxury">
                  {t("personalized_coffin")}
                </label>
              </li>
            </ul>
          </div>

          {/* Headstone and Monuments */}
          <div className="mb-4">
            <h3 className="text-sm font-semibold mb-2">
              {t("headstone_and_monuments")}
            </h3>
            <ul className="text-sm">
              <li>
                <input
                  type="radio"
                  id="headstone-monuments-different-types"
                  name="headstone_monuments"
                  className="mr-2"
                  onChange={() =>
                    handleFilterChange(
                      "headstone_monuments",
                      "Choice of different types of headstones"
                    )
                  }
                />
                <label htmlFor="headstone-monuments-different-types">
                  {t("choice_of_various_types_of_headstones")}
                </label>
              </li>
              <li>
                <input
                  type="radio"
                  id="headstone-monuments-personalized"
                  name="headstone_monuments"
                  className="mr-2"
                  onChange={() =>
                    handleFilterChange(
                      "headstone_monuments",
                      "Possibility of personalized tombstones"
                    )
                  }
                />
                <label htmlFor="headstone-monuments-personalized">
                  {t("option_for_personalized_headstones")}
                </label>
              </li>
              <li>
                <input
                  type="radio"
                  id="headstone-monuments-green"
                  name="headstone_monuments"
                  className="mr-2"
                  onChange={() =>
                    handleFilterChange(
                      "headstone_monuments",
                      "Green or natural grave markers"
                    )
                  }
                />
                <label htmlFor="headstone-monuments-green">
                  {t("green_or_natural_grave_markers")}
                </label>
              </li>
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full lg:w-3/4 p-6">
          {/* Search and Filter Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <input
                type="text"
                className="border p-2 w-full lg:w-2/3 rounded"
                placeholder="Search by location..."
                value={searchTerm} // Bind to searchTerm instead of filters.code
                onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm as user types
              />
              <button
                className="bg-orange-500 text-white px-4 py-2 rounded-r-lg"
                onClick={handleSearch} // Trigger filter update only on click
              >
                <SearchIcon style={{ fontSize: "24px", marginRight: "8px" }} />
              </button>
              <button
                className="ml-4 bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleMapView}
              >
                {t("maps")}
              </button>
            </div>
          </div>

          {/* Funeral Directors Listing */}
          {loading ? (
            <p>{t("loading")}</p>
          ) : (
            <div>
              <h2 className="text-xl font-semibold mb-4">
                {t("top_directors")}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {products.slice(0, 3).map((product, index) => (
                  <div
                    key={index}
                    className="bg-blue-50 border shadow-lg rounded-lg cursor-pointer transition-transform transform hover:scale-105 hover:bg-blue-100"
                    onClick={() => {
                      // Store document_id in localStorage
                      router.push(`/product?document_id=${product.documentId}`); // Navigate to product detail
                    }}
                  >
                    <Image
                      src={`http://localhost:1337${
                        product?.logo?.formats?.large?.url || ""
                      }`}
                      alt={product?.title || "Funeral Director"}
                      width={500}
                      height={500}
                      className="rounded-lg object-cover"
                    />
                    <h3 className="text-3xl font-semibold mt-2 flex justify-center">
                      {product?.title || "Unnamed Funeral Director"}
                    </h3>
                  </div>
                ))}
              </div>

              <br />
              <h2 className="text-xl font-semibold mb-4">
                {t("other_directors")}
              </h2>
              <div className="grid grid-cols-2 gap-6">
                {products.slice(3).map((product, index) => (
                  <div
                    key={index}
                    className="w-1/2 border p-4 shadow-lg rounded-lg mb-4 ml-4 flex cursor-pointer transition-transform transform hover:scale-105 hover:bg-blue-100"
                  >
                    <Image
                      src={`http://localhost:1337${
                        product?.logo?.formats?.large?.url || ""
                      }`}
                      alt={product?.title || "Funeral Director"}
                      width={250}
                      height={100}
                      className="rounded-lg object-cover cursor-pointer transition-transform transform hover:scale-105 hover:bg-blue-100"
                      onClick={() => {
                        router.push(
                          `/product?document_id=${product?.documentId}`
                        ); // Navigate to product detail
                      }}
                    />
                    <div className="ml-4">
                      <h3 className="text-2xl font-semibold">
                        {product?.title || "Unnamed Funeral Director"}
                      </h3>
                      <p className="text-xl text-gray-500">
                        {product?.description?.slice(0, 50) ||
                          "No description available"}
                        ...
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BurialCremationPage;
