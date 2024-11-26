import Footer from "./footer";
import Navbar from "./NavbarLogo";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
