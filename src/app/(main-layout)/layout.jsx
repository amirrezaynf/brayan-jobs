import "../globals.css";
import Header from "@/components/layout/header/Header";
import Footer from "@/components/layout/footer/Footer";

export const metadata = {
  title: "Brian Jobs",
  description: "Brian Jobs",
};

export default function RootLayout({ children }) {
  return (
    <div className='min-h-screen bg-black/90'>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
