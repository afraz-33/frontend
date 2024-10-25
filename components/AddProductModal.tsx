import { useState } from 'react';
import '../src/app/globals.css'

interface AddProductModalProps {
  onClose: () => void;
  onSave: (productData: ProductData) => void;
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

const AddProductModal = ({ onClose, onSave }: AddProductModalProps) => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
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
      file,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg overflow-y-auto max-h-[80vh] w-full md:w-1/2">
        <h2 className="text-lg font-bold mb-4">Add New Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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
              <option value="Burying">Burying</option>
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
              <option value="Condolence room">Condolence room(s)</option>
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
           <input
            type="number"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            placeholder="Guests"
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

          <div className="flex justify-between mt-4">
            <button type="submit" className="bg-green-500 text-white p-2 rounded">
              Save Product
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-red-500 text-white p-2 rounded"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
