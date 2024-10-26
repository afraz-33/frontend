import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import AddProductModal from '../components/AddProductModal';
import { useRouter } from 'next/router';

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
    url?: string;
  };
}

interface ProductData {
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
  file: File | null;
}

interface Contacts {
  firstname: string;
  surname: string;
  phone: string;
  residence: string;
  reason: string;
  comment: string;
  contact_pref: string;
  contact_time: string;
  funeral_pref: string;
  email: string;
  title: string;
}

const Dashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [contacts, setContacts] = useState<Contacts[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:1337/api/products?populate=logo', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setProducts(res.data.data || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    const fetchContacts = async () => {
      try {
        const res = await axios.get('http://localhost:1337/api/contacts', {});
        setContacts(res.data.data || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
    fetchContacts();
  }, []);

  const handleAddProduct = async (productData: ProductData) => {
    try {
      let imageId = null;

      if (productData.file) {
        const formData = new FormData();
        formData.append('files', productData.file);

        const uploadResponse = await axios.post('http://localhost:1337/api/upload', formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data',
          },
        });

        imageId = uploadResponse.data[0].id;
      }

      const data = {
        title: productData.title,
        description: productData.description,
        services: productData.services,
        contact: productData.contact,
        type: productData.type,
        funeral_type: productData.funeral_type,
        payment: productData.payment,
        arrangements: productData.arrangements,
        guests: productData.guests,
        location: productData.location,
        funeral_location: productData.funeral_location,
        facilities: productData.facilities,
        transport: productData.transport,
        coffin: productData.coffin,
        price: productData.price,
        headstone_monuments: productData.headstone_monuments,
        email: productData.email,
        code: productData.code,
         logo: imageId ,
      };

      await axios.post('http://localhost:1337/api/products', { data }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      alert('Product added successfully!');
      setModalOpen(false);

      const res = await axios.get('http://localhost:1337/api/products?populate=logo', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setProducts(res.data.data || []);
    } catch (error) {
      alert('Failed to add product.');
      console.error('Error:', error);
    }
  };

  return (
    <>
      <Navbar onAddProductClick={() => setModalOpen(true)} />
      <div className="container mx-auto p-4">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8">Undertakers</h2>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {products.map((product) => {
            const imageUrl =
              product?.logo?.formats?.large?.url ||
              product?.logo?.formats?.medium?.url ||
              product?.logo?.formats?.small?.url ||
              product?.logo?.formats?.thumbnail?.url ||
              product?.logo?.url;

            return (
              <div
                key={product.documentId}
                className="bg-white p-4 rounded-lg shadow-lg cursor-pointer transition-transform transform hover:scale-105 hover:bg-blue-100"
                onClick={() => {
                  localStorage.setItem('id', product.documentId);
                  router.push(`/view-product?document_id=${product.documentId}`);
                }}
              >
                {imageUrl ? (
                  <img
                    src={`http://localhost:1337${imageUrl}`}
                    alt={product.title}
                    className="w-full h-48 sm:h-64 object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-full h-48 sm:h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                    No Image
                  </div>
                )}
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mt-4 text-center text-gray-800">
                  {product.title || 'No Title'}
                </h3>
              </div>
            );
          })}
        </div>

        {/* Contacts Grid */}
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mt-12 mb-8">Contacts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {contacts.map((contact, index) => (
            <div
              key={index}
              className="bg-gray-900 p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:bg-gray-700"
            >
              <h3 className="text-xl sm:text-2xl text-white font-bold mb-2">{contact.title}</h3>
              <p className="text-sm sm:text-lg text-white"><strong>Name:</strong> {`${contact.firstname} ${contact.surname}`}</p>
              <p className="text-sm sm:text-lg text-white"><strong>Email:</strong> {contact.email}</p>
              <p className="text-sm sm:text-lg text-white"><strong>Phone:</strong> {contact.phone}</p>
              <p className="text-sm sm:text-lg text-white"><strong>Residence:</strong> {contact.residence}</p>
              <p className="text-sm sm:text-lg text-white"><strong>Reason:</strong> {contact.reason}</p>
              <p className="text-sm sm:text-lg text-white"><strong>Preferred Contact:</strong> {contact.contact_pref}</p>
              <p className="text-sm sm:text-lg text-white"><strong>Contact Time:</strong> {contact.contact_time}</p>
              <p className="text-sm sm:text-lg text-white"><strong>Funeral Preference:</strong> {contact.funeral_pref}</p>
              <p className="text-sm sm:text-lg text-white"><strong>Comment:</strong> {contact.comment}</p>
            </div>
          ))}
        </div>
      </div>

      {modalOpen && (
        <AddProductModal
          onClose={() => setModalOpen(false)}
          onSave={handleAddProduct}
        />
      )}
    </>
  );
};

export default Dashboard;
