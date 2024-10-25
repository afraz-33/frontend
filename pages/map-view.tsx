import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Loader } from '@googlemaps/js-api-loader';
import '../src/app/globals.css';
import Navbar from '../components/NavbarLogo';
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
      url: string
    };
  };
}

const MapView = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [map, setMap] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    // Fetch products from the backend
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:1337/api/products?populate=logo');
        setProducts(res.data.data || []);
      } catch (error) {
        console.error('Error fetching products:', error);
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

    loader.load().then((google) => {
      const mapInstance = new google.maps.Map(document.getElementById('map') as HTMLElement, {
        center: { lat: 51.505, lng: -0.09 }, // Default map center
        zoom: 13,
      });
      setMap(mapInstance);
    }).catch((error) => {
      console.error('Error loading Google Maps:', error);
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
                  <h3 style="font-size: 16px; font-weight: bold; color: #333;">${product.title}</h3>
                  <p style="font-size: 14px; color: #999;">${product?.description?.slice(0, 50) || 'No description available'}</p>
                  <div style="margin-top: 10px; display: flex; justify-content: space-between; align-items: center;">
                    <p style="font-size: 14px; font-weight: bold;">$${product.price}</p>
                    <button id="view-product-${product.documentId}" 
                    style="background-color: #007bff; color: white; border: none; border-radius: 5px; padding: 6px 12px; cursor: pointer;">
                      View Product
                    </button>
                  </div>
                </div>
              </div>
            `,
            });

            marker.addListener('click', () => {
              infowindow.open(map, marker);
            });

            google.maps.event.addListener(infowindow, 'domready', () => {
              const productButton = document.getElementById(`view-product-${product.documentId}`);
              if (productButton) {
                productButton.addEventListener('click', () => {
                  viewProduct(product.documentId);
                });
              }
            });
          }
        } catch (error) {
          console.error('Error geocoding product location:', error);
        }
      }
    };

    geocodeProducts();
  }, [map, products]);

  const geocodeLocation = async (location: string, geocoder: any) => {
    return new Promise<{ lat: number; lng: number } | null>((resolve) => {
      geocoder.geocode({ address: location }, (results: any, status: any) => {
        if (status === 'OK' && results[0]) {
          const { lat, lng } = results[0].geometry.location;
          resolve({ lat: lat(), lng: lng() });
        } else {
          console.error('Geocoding failed:', status);
          resolve(null);
        }
      });
    });
  };

  const viewProduct = (documentId: string) => {
    router.push(`/product?document_id=${documentId}`);
  };

  return <>
  <Navbar/>
  <div id="map" style={{ height: '100vh', width: '100%' }}></div>;
  </>
};

export default MapView;
