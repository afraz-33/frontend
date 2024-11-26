import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Loader } from "@googlemaps/js-api-loader";
import "../src/app/globals.css";
import Navbar from "../components/NavbarLogo";
import SearchIcon from "@mui/icons-material/Search";
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

const googleMapsApiKey = "AIzaSyDi1k9lhyvpaVbPCIbq7UIZFgGYLkbZLpI"; // Google Maps API Key

interface Product {
  documentId: string;
  title: string;
  code: string;
  description: string;
  price: string;
  logo: {
    formats: {
      large?: {
        url: string;
      };
      small?: {
        url: string;
      };
      url: string;
    };
  };
}

const MapView = () => {
  const t = useTranslations("map-view");
  const [products, setProducts] = useState<Product[]>([]);
  const [map, setMap] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    // Fetch products from the backend
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          "http://localhost:1337/api/products?populate=logo"
        );
        setProducts(res.data.data || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    // Load Google Maps when component mounts
    const loader = new Loader({
      apiKey: googleMapsApiKey,
      version: "weekly",
    });

    const customMapStyle = [
      {
        featureType: "poi", // Hide points of interest
        elementType: "all",
        stylers: [{ visibility: "off" }],
      },
      {
        featureType: "transit", // Hide transit stations and lines
        elementType: "all",
        stylers: [{ visibility: "off" }],
      },
      {
        featureType: "road", // Simplify roads
        elementType: "labels",
        stylers: [{ visibility: "simplified" }],
      },
      {
        featureType: "administrative", // Simplify borders and administrative labels
        elementType: "labels",
        stylers: [{ visibility: "off" }],
      },
      {
        featureType: "water", // Customize water appearance
        elementType: "geometry",
        stylers: [{ color: "#c9e7f1" }], // Light blue water color
      },
      {
        featureType: "landscape", // Simplify landscape
        elementType: "all",
        stylers: [{ color: "#f5f5f5" }], // Light gray for background
      },
    ];

    const simplifiedStyle = [
      {
        featureType: "poi", // Points of Interest (e.g., stores, restaurants)
        elementType: "labels", // Affects the labels
        stylers: [{ visibility: "off" }], // Hides them
      },
      {
        featureType: "transit", // Transit stations (e.g., metro, buses)
        elementType: "labels.icon", // Affects the station icons
        stylers: [{ visibility: "off" }], // Hides them
      },
      {
        featureType: "road", // Roads
        elementType: "labels", // Affects road labels
        stylers: [{ visibility: "off" }], // Hides road labels
      },
      {
        featureType: "administrative.land_parcel", // Land parcel boundaries
        elementType: "labels", // Affects their labels
        stylers: [{ visibility: "off" }], // Hides them
      },
      {
        featureType: "poi.business", // Specific business points of interest
        stylers: [{ visibility: "off" }], // Hides business icons and labels
      },
      {
        featureType: "poi.park", // Parks
        stylers: [{ color: "#e5e5e5" }], // Makes parks less visually prominent
      },
    ];

    loader
      .load()
      .then((google) => {
        const mapInstance = new google.maps.Map(
          document.getElementById("map") as HTMLElement,
          {
            center: { lat: 52.3676, lng: 4.9041 }, // Default map center
            zoom: 13,
            streetViewControl: false,
            mapTypeControl: false,
            styles: simplifiedStyle,
            fullscreenControl: false,
          }
        );
        setMap(mapInstance);
      })
      .catch((error) => {
        console.error("Error loading Google Maps:", error);
      });
  }, []);

  useEffect(() => {
    const geocodeProducts = async () => {
      if (!map || products.length === 0) return;

      const geocoder = new google.maps.Geocoder();

      for (const product of products) {
        try {
          const response = await geocodeLocation(product.code, geocoder);
          if (response) {
            const { lat, lng } = response;

            const marker = new google.maps.Marker({
              position: { lat, lng },
              map: map,
              title: product.title,
            });

            const infowindow = new google.maps.InfoWindow({
              content: `
              <div style="width: 250px; padding: 0; border-radius: 15px; overflow: hidden; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
                <div style="position: relative;">
                  <img src="${`http://localhost:1337${product?.logo?.formats?.large?.url}`}" 
                  alt="${product.title}" 
                  style="width: 100%; height: 150px; object-fit: cover; border-top-left-radius: 15px; border-top-right-radius: 15px;" />
                </div>
                <div style="padding: 10px 15px; background-color: white;">
                  <h3 style="font-size: 16px; font-weight: bold; color: #333;">${
                    product.title
                  }</h3>
                  <p style="font-size: 14px; color: #999;">${
                    product?.description?.slice(0, 50) ||
                    "No description available"
                  }</p>
                  <div style="margin-top: 10px; display: flex; justify-content: space-between; align-items: center;">
                    <p style="font-size: 14px; font-weight: bold;">$${
                      product.price
                    }</p>
                    <button id="view-product-${product.documentId}" 
                    style="background-color: #007bff; color: white; border: none; border-radius: 5px; padding: 6px 12px; cursor: pointer;">
                      View Product
                    </button>
                  </div>
                </div>
              </div>
            `,
            });

            marker.addListener("click", () => {
              infowindow.open(map, marker);
            });

            google.maps.event.addListener(infowindow, "domready", () => {
              const productButton = document.getElementById(
                `view-product-${product.documentId}`
              );
              if (productButton) {
                productButton.addEventListener("click", () => {
                  viewProduct(product.documentId);
                });
              }
            });
          }
        } catch (error) {
          console.error("Error geocoding product location:", error);
        }
      }
    };

    geocodeProducts();
  }, [map, products]);

  const geocodeLocation = async (location: string, geocoder: any) => {
    return new Promise<{ lat: number; lng: number } | null>((resolve) => {
      geocoder.geocode({ address: location }, (results: any, status: any) => {
        if (status === "OK" && results[0]) {
          const { lat, lng } = results[0].geometry.location;
          resolve({ lat: lat(), lng: lng() });
        } else {
          console.error("Geocoding failed:", status);
          resolve(null);
        }
      });
    });
  };

  const viewProduct = (documentId: string) => {
    router.push(`/product?document_id=${documentId}`);
  };

  const [searchText, setSearchText] = useState("");

  async function search() {
    const geocoder = new google.maps.Geocoder();

    if (searchText !== "") {
      geocoder.geocode({ address: searchText }, (results, status) => {
        // Use 'address' instead of 'searchText'
        if (status === "OK") {
          if (results && results[0]) {
            map.setCenter(results[0].geometry.location);
            new google.maps.Marker({
              map,
              position: results[0].geometry.location,
            });
          } else {
            alert("Address not found: " + status);
          }
        } else {
          alert("Address not found: " + status);
        }
      });
    }
  }

  const filters = [
    {
      title: "Type funeral",
      id: "type-funeral",
      filter_type: [
        "Traditional funeral",
        "Church funeral",
        "Non-religious burial",
        "Nature burial",
        "Family grave",
        "Theme funeral",
        "Eco funeral",
        "Islamic funeral",
        "Jewish funeral",
        "Hindu funeral",
        "Christian funeral",
      ],
    },
    {
      title: "Packages",
      id: "packages",
      filter_type: [
        "All-inclusive packages",
        "Choice of different packages (e.g., simple, traditional, luxury)",
      ],
    },
    {
      title: "Payment options",
      id: "payment-options",
      filter_type: [
        "Prepayment or payment in instalments",
        "Discounts for certain times or days",
      ],
    },
    {
      title: "Special funeral arrangements",
      id: "special-funeral-arrangements",
      filter_type: [
        "Home confinement",
        "Return to country of origin",
        "Seaman's funeral",
        "Direct cremation or burial (without ceremony)",
        "Military funeral services",
        "Children's funerals",
      ],
    },
    {
      title: "Number of guests",
      id: "number-of-guests",
      filter_type: ["< 50", "50 to 150", "150+"],
    },
    {
      title: "Location",
      id: "location",
      filter_type: [
        "Accessibility of public transport",
        "Parking facilities",
        "Quiet environment",
        "Urban location",
      ],
    },
    {
      title: "Location of the funeral",
      id: "location-of-funeral",
      filter_type: [
        "Church or religious building",
        "Funeral home with its own cemetery",
        "Outdoor location (e.g., park, forest, private land)",
        "Specific cemetery in the neighbourhood",
      ],
    },
    {
      title: "Type of facilities",
      id: "type-of-facilities",
      filter_type: [
        "Auditorium for ceremony",
        "Funeral room(s)",
        "24-hour room(s)",
        "Condolence room(s)",
        "Possibility for reception",
        "Family room",
      ],
    },
    {
      title: "Transport",
      id: "transport",
      filter_type: [
        "Funeral car",
        "Special transport (e.g., carriage, motorbike)",
        "Family transport",
      ],
    },
    {
      title: "Headstone and monuments",
      id: "headstone-and-monuments",
      filter_type: [
        "Choice of different types of headstones",
        "Possibility of personalised tombstones",
        "Green or natural grave markers",
      ],
    },
    {
      title: "Coffin options",
      id: "coffin-options",
      filter_type: [
        "Traditional wooden coffin",
        "Biodegradable coffin",
        "Personalised coffin (e.g., paintings, images, themes)",
        "Luxury coffin",
      ],
    },
  ];

  const filtersDutch = [
    {
      title: "Soort begrafenis",
      id: "type-funeral",
      filter_type: [
        "Traditionele begrafenis",
        "Kerkbegrafenis",
        "Niet-religieuze begrafenis",
        "Natuurbegrafenis",
        "Familiegraf",
        "Thema begrafenis",
        "Eco begrafenis",
        "Islamitische begrafenis",
        "Joodse begrafenis",
        "Hindoeïstische begrafenis",
        "Christelijke begrafenis",
      ],
    },
    {
      title: "Pakketten",
      id: "packages",
      filter_type: [
        "All-inclusive pakketten",
        "Keuze uit verschillende pakketten (bijv. simpel, traditioneel, luxe)",
      ],
    },
    {
      title: "Betalingsopties",
      id: "payment-options",
      filter_type: [
        "Vooruitbetaling of betaling in termijnen",
        "Kortingen voor bepaalde tijden of dagen",
      ],
    },
    {
      title: "Speciale begrafenisregelingen",
      id: "special-funeral-arrangements",
      filter_type: [
        "Thuisisolatie",
        "Terugkeer naar land van herkomst",
        "Zeelieden begrafenis",
        "Directe crematie of begrafenis (zonder ceremonie)",
        "Militaire begrafenisdiensten",
        "Kinderbegrafenissen",
      ],
    },
    {
      title: "Aantal gasten",
      id: "number-of-guests",
      filter_type: ["< 50", "50 tot 150", "150+"],
    },
    {
      title: "Locatie",
      id: "location",
      filter_type: [
        "Toegankelijkheid van openbaar vervoer",
        "Parkeervoorzieningen",
        "Rustige omgeving",
        "Stedelijke locatie",
      ],
    },
    {
      title: "Locatie van de begrafenis",
      id: "location-of-funeral",
      filter_type: [
        "Kerk of religieus gebouw",
        "Begrafenishuis met eigen begraafplaats",
        "Buitenlocatie (bijv. park, bos, privéterrein)",
        "Specifieke begraafplaats in de buurt",
      ],
    },
    {
      title: "Soort faciliteiten",
      id: "type-of-facilities",
      filter_type: [
        "Auditorium voor ceremonie",
        "Begrafeniskamer(s)",
        "24-uurs kamer(s)",
        "Condoleancekamer(s)",
        "Mogelijkheid voor receptie",
        "Familiekamer",
      ],
    },
    {
      title: "Vervoer",
      id: "transport",
      filter_type: [
        "Begrafenisauto",
        "Speciaal vervoer (bijv. koets, motorfiets)",
        "Familie vervoer",
      ],
    },
    {
      title: "Grafstenen en monumenten",
      id: "headstone-and-monuments",
      filter_type: [
        "Keuze uit verschillende soorten grafstenen",
        "Mogelijkheid voor gepersonaliseerde grafstenen",
        "Groene of natuurlijke grafmarkeringen",
      ],
    },
    {
      title: "Lijkkistopties",
      id: "coffin-options",
      filter_type: [
        "Traditionele houten lijkkist",
        "Biologisch afbreekbare lijkkist",
        "Gepersonaliseerde lijkkist (bijv. schilderijen, afbeeldingen, thema's)",
        "Luxe lijkkist",
      ],
    },
  ];

  const locale = router.locale;

  return (
    <>
      <Navbar />
      <section className="flex">
        <div className="w-1/3 flex flex-col items-center px-3 mt-10">
          <div className="w-full">
            {" "}
            <button
              onClick={() => router.back()}
              className="w-fit mb-5 ml-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
              {t("back")}
            </button>
          </div>
          <div className="flex w-3/4">
            <input
              type="text"
              onChange={(e) => setSearchText(e.target.value)}
              value={searchText}
              placeholder="Search by city or postcode"
              className="p-5 w-full border border-gray-200 rounded-l-lg focus:outline-none"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  search();
                }
              }}
            />
            <button
              className="bg-orange-500 text-white px-5   rounded-r-lg"
              onClick={search}
            >
              <a className="text-gray-800 text-lg hover:text-gray-500 flex items-center">
                <SearchIcon
                  style={{
                    color: "white",
                  }}
                />
                {/* <span className=" text-white">{t("searchbar")}</span> */}
                {/* Text aligned next to the icon */}
              </a>
            </button>
          </div>
          <ul className="px-4 mt-5">
            {locale === "en"
              ? filters.map((filter, idx) => {
                  return (
                    <li key={idx}>
                      <h3 className="text-sm font-semibold mb-2">
                        {filter.title}
                      </h3>
                      <ul>
                        {filter.filter_type.map((f, idx) => {
                          const radioId = `${filter.id}-${idx}`;
                          return (
                            <li key={idx}>
                              <input
                                type="checkbox"
                                id={radioId}
                                name={filter.id}
                                className="mr-2"
                              />
                              <label htmlFor={radioId}>{f}</label>
                            </li>
                          );
                        })}
                      </ul>
                    </li>
                  );
                })
              : filtersDutch.map((filter, idx) => {
                  return (
                    <li key={idx}>
                      <h3 className="text-sm font-semibold mb-2">
                        {filter.title}
                      </h3>
                      <ul>
                        {filter.filter_type.map((f, idx) => {
                          const radioId = `${filter.id}-${idx}`;
                          return (
                            <li key={idx}>
                              <input
                                type="checkbox"
                                id={radioId}
                                name={filter.id}
                                className="mr-2"
                              />
                              <label htmlFor={radioId}>{f}</label>
                            </li>
                          );
                        })}
                      </ul>
                    </li>
                  );
                })}
          </ul>
        </div>
        <div id="map" style={{ height: "80vh", width: "100%" }}></div>;
      </section>
    </>
  );
};

export default MapView;
