import Navbar from "../common/Navbar.jsx";
import Footer from "../common/Footer.jsx";

export default function PageLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="container page">
        {children}
      </main>
      <Footer />
    </>
  );
}
