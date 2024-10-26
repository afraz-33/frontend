
"use client";
import './globals.css'
import Image from 'next/image'; 
import Navbar from '../../components/NavbarLogo';
import SearchIcon from '@mui/icons-material/Search';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [type, setType] = useState('Cremation');
  const router = useRouter(); // Correct usage of useRouter from next/navigation
  if (typeof window !== 'undefined' && window.localStorage) {localStorage.setItem('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzI2ODE0MzY3LCJleHAiOjE3Mjk0MDYzNjd9.qVvv9ZbIA2H862yBYBsrGAL7WwnCSshGtsPlc40Pp4I')};
  const handleSearch = () => {
    if (searchTerm.trim()) {
      // Use router.push from next/navigation to navigate to the "cremation" route with query params
      router.push(`/cremation?type=${type}&code=${searchTerm}`);
    }
  };
  const handleMapView = () => {
    router.push('/map-view');  // Navigate to the map page
  };
  return (
    <>
    <Navbar/>
      {/* Curved Section */}
      <div style={{ backgroundColor: '#f0f0f0', display: 'block', overflow: 'hidden', position: 'relative' }}>
        {/* Main container */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100vw', // Use the full width of the viewport
            height: '350px', // Adjust height of the banner as needed
            position: 'relative',
          }}
        >
          {/* Text container with slight overlap */}
          <div
            style={{
              backgroundColor: '#002C45', // Dark blue background
              color: 'white',
              padding: '2rem',
              borderRadius: '0 100px 100px 0', // Curved right side
              width: '70%', // Take up 50% of the width
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1,
              marginRight: '-100px', // Slight overlap onto the image
            }}
          >
            <p style={{ fontSize: '1.07rem', color: 'white' }}>
              A death is tough enough. Make it a little less heavy by finding the perfect funeral director to meet your needs. Our website gives you access to a wide network of funeral directors throughout the Netherlands, carefully selected to meet your wishes. Whether your loved one is insured or not, we will help you organise a farewell that does justice to the life that has been lived.
            </p>
          </div>

          {/* Image container */}
          <div
            style={{
              position: 'relative',
              width: '50%', // Image takes up the remaining 50% of the screen width
              height: '100%',
              overflow: 'hidden',
            }}
          >
            <Image
              src="/4.png" // Ensure this points to the correct image
              alt="White roses on a car"
              layout="fill" // Image fills the container
              objectFit="cover" // Ensures the image fits without distortion
            />
          </div>
        </div>
      </div>

     {/* Search Section with Blue Background */}
<section className="bg-blue-100 py-12">
  <div className="container mx-auto">
    <h2 className="text-3xl font-bold text-center mb-8">Find a Funeral Director</h2>

    <div className="bg-blue-100 p-6 rounded-lg">
      {/* Burying and Cremation Buttons */}
      <div className="flex justify-center space-x-4 mb-8">
      <button
      className={`text-lg font-semibold ${type === 'Burying' ? 'text-blue-900' : 'text-blue-800'}`}
      onClick={() => setType('Burying')}
      >
      Burying
      </button>
      <button className={`text-lg font-semibold ${type === 'Cremation' ? 'text-blue-900' : 'text-blue-800'}`}
      onClick={() => setType('Cremation')}
      >
      Cremation
      </button>
      </div>

      {/* Search Input Section */}
      <div className="flex justify-center items-center">
        <div className="flex items-center bg-white shadow-lg rounded-lg w-full max-w-3xl">
          {/* Longer Search Input */}
          <input
            type="text"
            placeholder="Search by city or postcode"
            className="p-5 w-full border border-gray-200 rounded-l-lg focus:outline-none"
            style={{ width: '80%' ,height:'20%'}} 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}// Adjust the width of the input field
          />
          <button
           className="bg-orange-500 text-white px-8 py-4 rounded-r-lg"
                  onClick={handleSearch} // Trigger search on button click
                >
            <a className="text-gray-800 text-lg hover:text-gray-500 flex items-center" onClick={handleSearch}>
            <SearchIcon style={{ fontSize: '24px', marginRight: '8px' }} />
              <span className="ml-2">Search</span> {/* Text aligned next to the icon */}
            </a></button>
        </div>
        <button className="ml-4 bg-blue-500 text-white px-4 py-2 rounded" onClick={handleMapView}>
                Maps
              </button>
      </div>
    </div>
  </div>
</section>

      {/* Funeral Director Cards Section */}
      <section className="py-12 block">
        <div className="container mx-auto">
          <h3 className="text-xl font-bold text-center mb-6">Funeral Director in the Picture</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Funeral Director Card */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden transform transition duration-300 hover:scale-105">
              <Image src="/1.png" alt="Funeral Director 1" width={400} height={300} className="object-cover w-full h-[250px]" />
              <div className="p-4">
                <h4 className="text-lg font-semibold">Uitvaartverzorging Van der Spek</h4>
                <p className="text-sm text-gray-600">A family business with a long tradition within funeral services</p>
              </div>
            </div>

            {/* Another Funeral Director */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden transform transition duration-300 hover:scale-105">
              <Image src="/1.png" alt="Funeral Director 2" width={400} height={300} className="object-cover w-full h-[250px]" />
              <div className="p-4">
                <h4 className="text-lg font-semibold">Memoria Uitvaartzorg</h4>
                <p className="text-sm text-gray-600">Modern and personalized funeral services</p>
              </div>
            </div>

            {/* Another Funeral Director */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden transform transition duration-300 hover:scale-105">
              <Image src="/1.png" alt="Funeral Director 3" width={400} height={300} className="object-cover w-full h-[250px]" />
              <div className="p-4">
                <h4 className="text-lg font-semibold">Uitvaartverzorging CUVO</h4>
                <p className="text-sm text-gray-600">From traditional to modern and unique funeral services</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stories Section */}
      <section className="py-12 bg-white block">
        <div className="container mx-auto">
          <h3 className="text-2xl font-bold mb-6 text-center">Prepare yourself with these stories and tips</h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Large Image with Text at Bottom */}
            <div className="relative rounded-lg overflow-hidden">
              <Image src="/1.png" alt="Nature burial" width={800} height={400} className="object-cover w-full h-[400px]" />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-6">
                <h4 className="text-xl font-bold text-white">Nature burial, Back to Nature</h4>
                <p className="text-white">
                  More and more people are choosing natural burial in the Netherlands. What are the advantages 
                  and what should you look out for?
                </p>
              </div>
            </div>

            {/* Smaller Stories */}
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-4">
                <Image src="/1.png" width={80} height={80} className="rounded-lg" alt="Tip 1" />
                <h5 className="text-lg font-semibold">Digital estate care for your online legacy</h5>
              </div>

              <div className="flex items-center space-x-4">
                <Image src="/1.png" width={80} height={80} className="rounded-lg" alt="Tip 2" />
                <h5 className="text-lg font-semibold">Eternal reefs: Turn your loved one's ashes into a living memorial</h5>
              </div>

              <div className="flex items-center space-x-4">
                <Image src="/1.png" width={80} height={80} className="rounded-lg" alt="Tip 3" />
                <h5 className="text-lg font-semibold">The most special places you might not have thought of yet</h5>
              </div>

              <div className="flex items-center space-x-4">
                <Image src="/1.png" width={80} height={80} className="rounded-lg" alt="Tip 4" />
                <h5 className="text-lg font-semibold">Celebrate life in your own way</h5>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
