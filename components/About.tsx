// about.tsx
import '../src/app/about.css'
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../components/Navbar'; // Assuming you have the Navbar component already created

const About = () => {
  return (
    <>
      {/* About Section */}
      <section className="bg-white py-12 px-4">
        <div className="container mx-auto flex justify-between items-start">
          {/* Left Side - Logo and Menu */}
          <div className="w-1/3">
            <div className="mb-8">
              <Image
                src="/logo.png" // Ensure you have the logo in the public folder
                alt="Company Logo"
                width={150}
                height={100}
              />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Menu</h3>
            <hr></hr>
            <ul className="text-lg text-gray-800 space-y-4">
              <li>
                <Link href="/" className="hover:text-blue-800">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/burying" className="hover:text-blue-800">
                  Burying
                </Link>
              </li>
              <li>
                <Link href="/cremation" className="hover:text-blue-800">
                  Cremation
                </Link>
              </li>
              <li>
                <Link href="/what-to-do" className="hover:text-blue-800">
                  What to do
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="hover:text-blue-800">
                  Blogs
                </Link>
              </li>
              <li>
                <Link href="/urgent" className="font-bold hover:text-blue-800">
                  Urgent
                </Link>
              </li>
            </ul>
          </div>

          {/* Right Side - About Us Section */}
          <div className="w-2/3">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">About us</h3>
            <br />
            <hr />
            <br />
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              At Uitvaart Centrum Nederland, we will assist you in finding the right funeral director. 
              We offer an independent and convenient platform where you can easily compare funeral directors 
              based on price, location, and service. This way, you can make a well-considered choice in a difficult time 
              that suits your wishes. Transparency and objectiveness are our top priorities.
            </p>
            <br />
            <br />
            <h4 className="text-2xl font-bold text-gray-900 mb-4">Important information</h4>
            <br/>
            <hr/>
            <br/>
            <ul className="text-lg text-gray-800 space-y-2">
              <li>
                <Link href="/terms-and-conditions" className="hover:text-blue-800">
                  General terms and conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-blue-800">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/chamber-of-commerce" className="hover:text-blue-800">
                  Chamber of Commerce number
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
