import localFont from 'next/font/local';
import "./globals.css";
import Header from '@/components/layout/Header';



const yekanBakh = localFont({
  src: [
    {
      path: '../../public/fonts/yekanlight.ttf', // مسیر نسبت به فایل layout.js
      weight: '300', // Light
      style: 'normal',
    },
    {
      path: '../../public/fonts/yekanmedium.ttf',
      weight: '500', // Medium
      style: 'normal',
    },
    {
      path: '../../public/fonts/yekanbold.ttf',
      weight: '700', // Bold
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-yekan-bakh', // این متغیر را برای Tailwind می‌سازیم
});

export const metadata = {
  title: "Brian Jobs",
  description: "Brian Jobs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
