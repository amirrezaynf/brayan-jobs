import "../globals.css";
import KarjooHeader from "@/components/layout/header/KarjooHeader";
import KarjooDashboard from "@/components/modules/karjoo/KarjooDashboard";
export const metadata = {
  title: "Brian Jobs",
  description: "Brian Jobs",
};

export default function RootLayout({ children }) {
  return (
    <div className='min-h-screen bg-black/90  '>

<div className="flex min-h-screen  text-gray-200">
      <KarjooDashboard />

      {/* Main Content Area */}
      <div className="  flex-1 lg:mr-64">
        {/* Header */}
        <KarjooHeader />

        {children}
      </div>
    </div>

     
    </div>
  );
}
