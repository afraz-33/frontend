'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/NavbarLogo';
import '../src/app/globals.css';
import SearchIcon from '@mui/icons-material/Search';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router'; 

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
const searchParams = useSearchParams();  // This replaces router.query
const type = searchParams?.get('type') ?? 'Cremation';  // Use a fallback value if 'type' is missing
const code = searchParams?.get('code') ?? '';    
const router = useRouter();
  const [filters, setFilters] = useState<FilterOptions>({
    type: 'Cremation',
    priceRange: [50, 10000],
    location: '',
    funeral_type: '',
    payment: '',
    arrangements: '',
    guests: '',
    facilities: '',
    transport: '',
    coffin: '',
    headstone_monuments: '',
    code:''
  });

  const [searchTerm, setSearchTerm] = useState(''); 

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
    handleFilterChange('code', searchTerm); // Only updates the 'code' filter when the button is clicked
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
      const response = await axios.get('http://localhost:1337/api/products/search', {
        params: queryParams,
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (type || code) {
      setFilters(prevFilters => ({
        ...prevFilters,
        type: (type as string) || prevFilters.type,
        code: (code as string) || prevFilters.code
      }));
      setSearchTerm(code as string || '');  // Update the search input value
    }
  }, [type, code]);

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const handleMapView = () => {
    router.push('/map-view');  // Navigate to the map page
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
        {/* Sidebar for Filters */}
        <div className="w-full lg:w-1/4 p-6 bg-white shadow-lg">
          <h2 className="text-lg font-semibold mb-4">Filters</h2>

          {/* Burial or Cremation Type */}
          <div className="mb-4">
            <div className="flex justify-between items-center">
              <button
                className={`p-2 text-sm rounded ${filters.type === 'Burying' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                onClick={() => handleFilterChange('type', 'Burying')}
              >
                Burying
              </button>
              <button
                className={`p-2 text-sm rounded ${filters.type === 'Cremation' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                onClick={() => handleFilterChange('type', 'Cremation')}
              >
                Cremation
              </button>
            </div>
          </div>

          {/* Price Range */}
          <div className="mb-4">
            <h3 className="text-sm font-semibold mb-2">Price Range</h3>
            <div className="flex">
              <input
                type="number"
                className="p-2 border rounded-l w-1/2"
                value={filters.priceRange[0]}
                onChange={(e) => handlePriceChange(0, e.target.value)}
              />
              <input
                type="number"
                className="p-2 border rounded-r w-1/2"
                value={filters.priceRange[1]}
                onChange={(e) => handlePriceChange(1, e.target.value)}
              />
            </div>
          </div>

          {/* Funeral Types */}
          <div className="mb-4">
            <h3 className="text-sm font-semibold mb-2">Type of Funeral</h3>
            <ul className="text-sm">
              <li><input type="radio" name="funeral_type" className="mr-2" onChange={() => handleFilterChange('funeral_type', 'Traditional Funeral')} /> Traditional Funeral</li>
              <li><input type="radio" name="funeral_type" className="mr-2" onChange={() => handleFilterChange('funeral_type', 'Church Funeral')} /> Church Funeral</li>
              <li><input type="radio" name="funeral_type" className="mr-2" onChange={() => handleFilterChange('funeral_type', 'Non-religious')} /> Non-religious Burial</li>
              <li><input type="radio" name="funeral_type" className="mr-2" onChange={() => handleFilterChange('funeral_type', 'Nature Burial')} /> Nature Burial</li>
              <li><input type="radio" name="funeral_type" className="mr-2" onChange={() => handleFilterChange('funeral_type', 'Eco Funeral')} /> Eco Funeral</li>
            </ul>
          </div>

          {/* Payment Options */}
          <div className="mb-4">
            <h3 className="text-sm font-semibold mb-2">Payment Options</h3>
            <ul className="text-sm">
              <li><input type="radio" name="payment" className="mr-2" onChange={() => handleFilterChange('payment', 'Prepayment')} /> Prepayment</li>
              <li><input type="radio" name="payment" className="mr-2" onChange={() => handleFilterChange('payment', 'Payment in Installments')} /> Payment in Installments</li>
            </ul>
          </div>

          {/* Guests */}
          <div className="mb-4">
            <h3 className="text-sm font-semibold mb-2">Number of Guests</h3>
            <ul className="text-sm">
              <li><input type="radio" name="guests" className="mr-2" onChange={() => handleFilterChange('guests', '<50')} /> {`<`} 50</li>
              <li><input type="radio" name="guests" className="mr-2" onChange={() => handleFilterChange('guests', '50-100')} /> 50 to 100</li>
              <li><input type="radio" name="guests" className="mr-2" onChange={() => handleFilterChange('guests', '>150')} /> {`>`} 150</li>
            </ul>
          </div>

          {/* Additional Filters... */}
           {/* Location */}
           <div className="mb-4">
            <h3 className="text-sm font-semibold mb-2">Location</h3>
            <ul className="text-sm">
              <li><input type="radio" name="guests" className="mr-2" onChange={() => handleFilterChange('location', 'Accessibility of public transport')} />Accessibility of public transport</li>
              <li><input type="radio" name="guests" className="mr-2" onChange={() => handleFilterChange('location', 'Parking Facilities')} />Parking Facilities</li>
              <li><input type="radio" name="guests" className="mr-2" onChange={() => handleFilterChange('location', 'Quiet Environment')} />Quiet Environment</li>
              <li><input type="radio" name="guests" className="mr-2" onChange={() => handleFilterChange('location', 'Urban Location')} />Urban Location</li>
            </ul>
          </div>

          {/* Funeral Location */}
          <div className="mb-4">
            <h3 className="text-sm font-semibold mb-2">Location</h3>
            <ul className="text-sm">
              <li><input type="radio" name="guests" className="mr-2" onChange={() => handleFilterChange('funeral_location', 'Church or religious building')} />Church or religious building </li>
              <li><input type="radio" name="guests" className="mr-2" onChange={() => handleFilterChange('funeral_location', 'Funeral home with its own cemetery')} />Funeral home with its own cemetery</li>
              <li><input type="radio" name="guests" className="mr-2" onChange={() => handleFilterChange('funeral_location', 'Outdoor Location')} />Outdoor Location (e.g. park, forest, private land)</li>
              <li><input type="radio" name="guests" className="mr-2" onChange={() => handleFilterChange('funeral_location', 'Specific Cemetery in the neighbourhood')} />Specific Cemetery in the neighbourhood</li>
            </ul>
          </div>

          {/* Special Funeral Arrangements */}
          <div className="mb-4">
            <h3 className="text-sm font-semibold mb-2">Special Funeral Arrangements</h3>
            <ul className="text-sm">
              <li><input type="radio" name="arrangements" className="mr-2" onChange={() => handleFilterChange('arrangements', 'Home Confinement')} /> Home Confinement</li>
              <li><input type="radio" name="arrangements" className="mr-2" onChange={() => handleFilterChange('arrangements', 'Return to Country of Origin')} /> Return to Country of Origin</li>
              <li><input type="radio" name="arrangements" className="mr-2" onChange={() => handleFilterChange('arrangements', 'Seaman’s Funeral')} /> Seaman’s Funeral</li>
              <li><input type="radio" name="arrangements" className="mr-2" onChange={() => handleFilterChange('arrangements', 'Direct Cremation or Burial')} /> Direct Cremation or Burial (without ceremony)</li>
              <li><input type="radio" name="arrangements" className="mr-2" onChange={() => handleFilterChange('arrangements', 'Military Funeral Services')} /> Military Funeral Services</li>
              <li><input type="radio" name="arrangements" className="mr-2" onChange={() => handleFilterChange('arrangements', 'Children’s Funerals')} /> Children's Funerals</li>
            </ul>
          </div>

          {/* Facilities */}
          <div className="mb-4">
            <h3 className="text-sm font-semibold mb-2">Type of Facilities</h3>
            <ul className="text-sm">
              <li><input type="radio" name="facilities" className="mr-2" onChange={() => handleFilterChange('facilities', 'Auditorium for ceremony')} /> Auditorium for ceremony</li>
              <li><input type="radio" name="facilities" className="mr-2" onChange={() => handleFilterChange('facilities', 'Funeral Room')} /> Funeral room(s)</li>
              <li><input type="radio" name="facilities" className="mr-2" onChange={() => handleFilterChange('facilities', '24 hour room')} /> 24 hour room(s)</li>
              <li><input type="radio" name="facilities" className="mr-2" onChange={() => handleFilterChange('facilities', 'Condolence room')} /> Condolence room(s)</li>
              <li><input type="radio" name="facilities" className="mr-2" onChange={() => handleFilterChange('facilities', 'Possibility for reception')} /> Possibility for reception</li>
              <li><input type="radio" name="facilities" className="mr-2" onChange={() => handleFilterChange('facilities', 'Family room')} /> Family room</li>
            </ul>
          </div>

                    {/* Transport */}
                    <div className="mb-4">
            <h3 className="text-sm font-semibold mb-2">Transport</h3>
            <ul className="text-sm">
              <li><input type="radio" name="transport" className="mr-2" onChange={() => handleFilterChange('transport', 'Funeral car')} /> Funeral car</li>
              <li><input type="radio" name="transport" className="mr-2" onChange={() => handleFilterChange('transport', 'Special Transport')} /> Special Transport (e.g. carriage, motorbike)</li>
              <li><input type="radio" name="transport" className="mr-2" onChange={() => handleFilterChange('transport', 'Family Transport')} /> Family Transport</li>
            </ul>
          </div>

          {/* Coffin Options */}
          <div className="mb-4">
            <h3 className="text-sm font-semibold mb-2">Coffin Options</h3>
            <ul className="text-sm">
              <li><input type="radio" name="coffin" className="mr-2" onChange={() => handleFilterChange('coffin', 'Traditional wooden coffin')} /> Traditional wooden coffin</li>
              <li><input type="radio" name="coffin" className="mr-2" onChange={() => handleFilterChange('coffin', 'Biodegradable coffin')} /> Biodegradable coffin</li>
              <li><input type="radio" name="coffin" className="mr-2" onChange={() => handleFilterChange('coffin', 'Personalized coffin')} /> Personalized coffin (e.g., paintings, themes)</li>
              <li><input type="radio" name="coffin" className="mr-2" onChange={() => handleFilterChange('coffin', 'Luxury coffin')} /> Luxury coffin</li>
            </ul>
          </div>

          {/* Headstone and Monuments */}
          <div className="mb-4">
            <h3 className="text-sm font-semibold mb-2">Headstone and Monuments</h3>
            <ul className="text-sm">
              <li><input type="radio" name="headstone_monuments" className="mr-2" onChange={() => handleFilterChange('headstone_monuments', 'Choice of different types of headstones')} /> Choice of different types of headstones</li>
              <li><input type="radio" name="headstone_monuments" className="mr-2" onChange={() => handleFilterChange('headstone_monuments', 'Possibility of personalized tombstones')} /> Possibility of personalized tombstones</li>
              <li><input type="radio" name="headstone_monuments" className="mr-2" onChange={() => handleFilterChange('headstone_monuments', 'Green or natural grave markers')} /> Green or natural grave markers</li>
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
            <SearchIcon style={{ fontSize: '24px', marginRight: '8px' }} />
          </button>
          <button className="ml-4 bg-blue-500 text-white px-4 py-2 rounded" onClick={handleMapView}>
                Maps
              </button>
            </div>
          </div>

          {/* Funeral Directors Listing */}
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div>
              <h2 className="text-xl font-semibold mb-4">Top directors</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {products.slice(0, 3).map((product, index) => (
                  <div key={index} className="bg-blue-50 border shadow-lg rounded-lg cursor-pointer transition-transform transform hover:scale-105 hover:bg-blue-100" onClick={() => {// Store document_id in localStorage
                    router.push(`/product?document_id=${product.documentId}`); // Navigate to product detail
                  }}>
                    <Image
                      src={`http://localhost:1337${product?.logo?.formats?.large?.url || ''}`}
                      alt={product?.title || 'Funeral Director'}
                      width={500}
                      height={500}
                      className="rounded-lg object-cover"
                    />
                    <h3 className="text-3xl font-semibold mt-2 flex justify-center">
                      {product?.title || 'Unnamed Funeral Director'}
                    </h3>
                  </div>
                ))}
              </div>

              <br />
              <h2 className="text-xl font-semibold mb-4">Other directors</h2>
              <div className="grid grid-cols-2 gap-6">
                {products.slice(3).map((product, index) => (
                  <div key={index} className="w-1/2 border p-4 shadow-lg rounded-lg mb-4 ml-4 flex cursor-pointer transition-transform transform hover:scale-105 hover:bg-blue-100">
                    <Image
                      src={`http://localhost:1337${product?.logo?.formats?.large?.url || ''}`}
                      alt={product?.title || 'Funeral Director'}
                      width={250}
                      height={100}
                      className="rounded-lg object-cover cursor-pointer transition-transform transform hover:scale-105 hover:bg-blue-100"
                      onClick={() => {
                        router.push(`/product?document_id=${product?.documentId}`); // Navigate to product detail
                      }}
                    />
                    <div className="ml-4">
                      <h3 className="text-2xl font-semibold">{product?.title || 'Unnamed Funeral Director'}</h3>
                      <p className="text-xl text-gray-500">
                        {product?.description?.slice(0, 50) || 'No description available'}...
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BurialCremationPage;
