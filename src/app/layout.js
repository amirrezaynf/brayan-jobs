import "./globals.css";

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
