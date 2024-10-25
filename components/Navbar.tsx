import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useState } from 'react';
import AddBlogModal from './AddBlogModal'; // Import the AddBlogModal component
import '../src/app/globals.css';

interface NavbarProps {
  showAddProduct?: boolean; // Optional prop to show or hide the "Add Product" button
  onAddProductClick?: () => void;
}

const Navbar = ({ showAddProduct = true, onAddProductClick }: NavbarProps) => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [blogModalOpen, setBlogModalOpen] = useState(false); // State to control Blog Modal

  const handleLogout = () => {
    const confirmLogout = window.confirm('Are you sure you want to log out?');
    if (confirmLogout) {
      localStorage.removeItem('token');
      router.push('/login');
    }
  };

  const handleAddBlogClick = () => {
    setBlogModalOpen(true); // Open Add Blog Modal
  };

  const handleBlogSave = (blogData: any) => {
    // Handle the saving of blog data, potentially sending it to an API
    console.log('Saving blog data:', blogData);
    setBlogModalOpen(false); // Close the modal after saving
  };

  return (
    <>
      <nav className="bg-white-100 shadow-lg sticky top-0 z-50" style={{ maxHeight: '125px' }}>
        <div className="container mx-auto px-4 flex justify-between items-center py-3">
          {/* Logo */}
          <Link href="/dashboard" passHref>
            <div className="flex items-center cursor-pointer">
              <Image
                src="/logo.png"
                alt="Logo"
                width={120}
                height={120}
                className="object-contain"
                style={{ maxHeight: '100%', maxWidth: '100%' }}
              />
            </div>
          </Link>

          <div className="flex space-x-2">
            {showAddProduct && (
              <button
                className="text-xl bg-white text-blue-500 px-2 py-2 rounded hover:bg-blue-100"
                onClick={onAddProductClick}
              >
                Add Product
              </button>
            )}

            {/* Add Blog Button */}
            <button
              className="text-xl bg-white text-green-500 px-2 py-2 rounded hover:bg-green-100"
              onClick={handleAddBlogClick}
            >
              Add Blog
            </button>

            <button
              className="text-xl bg-white text-red-500 px-2 py-2 rounded hover:bg-red-100"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Add Blog Modal */}
      {blogModalOpen && (
        <AddBlogModal
          onClose={() => setBlogModalOpen(false)}
          onSave={handleBlogSave}
        />
      )}
    </>
  );
};

export default Navbar;
