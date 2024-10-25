import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Navbar from '../components/Navbar';

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
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [services, setServices] = useState('');
  const [contact, setContact] = useState('');
  const [type, setType] = useState('');
  const [funeralType, setFuneralType] = useState('');
  const [payment, setPayment] = useState('');
  const [arrangements, setArrangements] = useState('');
  const [guests, setGuests] = useState('');
  const [location, setLocation] = useState('');
  const [funeralLocation, setFuneralLocation] = useState('');
  const [facilities, setFacilities] = useState('');
  const [transport, setTransport] = useState('');
  const [coffin, setCoffin] = useState('');
  const [price, setPrice] = useState('');
  const [headstoneMonuments, setHeadstoneMonuments] = useState('');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const document_id = typeof window !== 'undefined' ? localStorage.getItem('id') : null;

  useEffect(() => {
    if (document_id) {
      const fetchProduct = async () => {
        try {
          const res = await axios.get(`http://localhost:1337/api/products/${document_id}?populate=logo`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          });
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
          console.error('Error fetching product details:', error);
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
        formData.append('files', file);
        const uploadResponse = await axios.post('http://localhost:1337/api/upload', formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data',
          },
        });
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
        ...(imageId && { logo: imageId }),
      };

      await axios.put(`http://localhost:1337/api/products/${document_id}`, { data }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      alert('Product updated successfully!');
      router.push("/dashboard");
    } catch (error) {
      alert('Failed to update product.');
      console.error('Error updating product:', error);
    }
  };

  const handleDeleteProduct = async () => {
    const confirmation = window.confirm("Are you sure you want to delete this product?");
    if (!confirmation) {
      return;
    }

    try {
      await axios.delete(`http://localhost:1337/api/products/${document_id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      alert('Product deleted successfully!');
      router.push('/dashboard');
    } catch (error) {
      alert('Failed to delete product.');
      console.error('Error deleting product:', error);
    }
  };

  return (
    <>
      <Navbar showAddProduct={false} />
      <div className="container mx-auto p-4">
        {product ? (
          <div>
            <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="w-full p-2 border border-gray-300 rounded mb-4"
              required
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              className="w-full p-2 border border-gray-300 rounded mb-4"
              required
            />
            <input
              type="text"
              value={services}
              onChange={(e) => setServices(e.target.value)}
              placeholder="Services"
              className="w-full p-2 border border-gray-300 rounded mb-4"
              required
            />
            <input
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="Contact"
              className="w-full p-2 border border-gray-300 rounded mb-4"
              required
            />
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="City/Postal Code"
              className="w-full p-2 border border-gray-300 rounded mb-4"
              required
            />
            <label htmlFor="ype">Type</label>
            <select
              id="Type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              required
            >
              <option value="">Select type</option>
              <option value="Buying">Buying</option>
              <option value="Cremation">Cremation</option>
            </select>
            <label htmlFor="funeralType">Type of Funeral</label>
            <select
              id="funeralType"
              value={funeralType}
              onChange={(e) => setFuneralType(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              required
            >
              <option value="">Select funeral type</option>
              <option value="Traditional Funeral">Traditional Funeral</option>
              <option value="Church Funeral">Church Funeral</option>
              <option value="Non-religious Burial">Non-religious Burial</option>
              <option value="Nature Burial">Nature Burial</option>
              <option value="Eco Funeral">Eco Funeral</option>
            </select>
           <label htmlFor="payment">Payment Options</label>
            <select
              id="payment"
              value={payment}
              onChange={(e) => setPayment(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              required
            >
              <option value="">Select payment option</option>
              <option value="Prepayment">Prepayment</option>
              <option value="Payment in Installments">Payment in Installments</option>
            </select>
            <label htmlFor="arrangements">Special Funeral Arrangements</label>
            <select
              id="arrangements"
              value={arrangements}
              onChange={(e) => setArrangements(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              required
            >
              <option value="">Select special arrangements</option>
              <option value="Home Confinement">Home Confinement</option>
              <option value="Return to Country of Origin">Return to Country of Origin</option>
              <option value="Seaman’s Funeral">Seaman’s Funeral</option>
              <option value="Direct Cremation or Burial">Direct Cremation or Burial</option>
              <option value="Military Funeral Services">Military Funeral Services</option>
              <option value="Children’s Funerals">Children's Funerals</option>
            </select>
            <label htmlFor="location">Location</label>
            <select
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              required
            >
              <option value="">Select Location</option>
              <option value="Accessibility of public transport">Accessibility of public transport </option>
              <option value="Parking Facilities">Parking Facilities</option>
              <option value="Quiet Environment">Quiet Environment</option>
              <option value="Urban Locatio">Urban Location</option>
            </select>
            <label htmlFor="funeralLocation">Funeral Location</label>
            <select
              id="funeralLocation"
              value={funeralLocation}
              onChange={(e) => setFuneralLocation(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              required
            >
               <option value="">Select Funeral Location</option>
               <option value="Church or religious building">Church or religious building</option>
               <option value="Funeral home with its own cemetery">Funeral home with its own cemetery</option>
               <option value="Outdoor Location">Outdoor Location (e.g. park, forest, private land)</option>
               <option value="Specific Cemetery in the neighbourhood">Specific Cemetery in the neighbourhood</option>
            </select>
            <label htmlFor="facilities">Facilities</label>
            <select
              id="facilities"
              value={facilities}
              onChange={(e) => setFacilities(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              required
            >
              <option value="">Select Facility Type</option>
              <option value="Auditorium for ceremony">Auditorium for ceremony</option>
              <option value="Funeral room">Funeral room(s)</option>
              <option value="24 hour room">24 hour room(s)</option>
              <option value="Condolence room(s)">Condolence room(s)</option>
              <option value="Possibility for reception">Possibility for reception</option>
              <option value="Family room">Family room</option>
            </select>
            <label htmlFor="transport">Transport</label>
            <select
              id="transport"
              value={transport}
              onChange={(e) => setTransport(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              required
            >
               <option value="">Select Transport Type</option>
              <option value="Funeral car">Funeral car</option>
              <option value="Special Transport">Special Transport (e.g. carriage, motorbike)</option>
              <option value="Family transport">Family transport</option>
            </select>
            <label htmlFor="coffin">Coffin</label>
            <select
              id="coffin"
              value={coffin}
              onChange={(e) => setCoffin(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              required
            >
              <option value="">Select Coffin Type</option>
              <option value="Traditional wooden coffin">Traditional wooden coffin</option>
              <option value="Biodegradable coffin">Biodegradable coffin</option>
              <option value="Personalised coffin">Personalised coffin (e.g. paintings, images, themes)</option>
              <option value="Luxury coffin">Luxury coffin</option>
            </select>
            <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
            <label htmlFor="headstone">Headstone & Monuments</label>
            <select
              id="headstone"
              value={headstoneMonuments}
              onChange={(e) => setHeadstoneMonuments(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              required
            >
              <option value="">Select Monument Type</option>
              <option value="Choice of different types of headstones">Choice of different types of headstones</option>
              <option value="Possibility of personalised tombstones">Possibility of personalised tombstones</option>
              <option value="Green or natural grave markers">Green or natural grave markers</option>
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
              onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
              className="w-full p-2 mb-4"
            />

            <div className="flex justify-between">
              <button
                onClick={handleUpdateProduct}
                className="bg-green-500 text-white p-2 rounded"
              >
                Save Changes
              </button>
              <button
                onClick={handleDeleteProduct}
                className="bg-red-500 text-white p-2 rounded"
              >
                Delete Product
              </button>
            </div>
          </div>
        ) : (
          <p>Loading product details...</p>
        )}
      </div>
    </>
  );
};

export default ProductDetail;

