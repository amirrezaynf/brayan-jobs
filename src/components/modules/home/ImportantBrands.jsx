import Image from "next/image";
import Link from "next/link";

const brands = [
  {
    name: "Digikala",
    alt: "Digikala",
    href: "https://www.digikala.com",
    src: "https://placehold.co/150x60.png?text=Digikala",
  },
  {
    name: "Snapp",
    alt: "Snapp",
    href: "https://snapp.ir",
    src: "https://placehold.co/150x60.png?text=Snapp",
  },
  {
    name: "Cafe Bazaar",
    alt: "Cafe Bazaar",
    href: "https://cafebazaar.ir",
    src: "https://placehold.co/150x60.png?text=Cafe+Bazaar",
  },
  {
    name: "Tapsi",
    alt: "Tapsi",
    href: "https://tapsi.ir",
    src: "https://placehold.co/150x60.png?text=Tapsi",
  },
  {
    name: "Divar",
    alt: "Divar",
    href: "https://divar.ir",
    src: "https://placehold.co/150x60.png?text=Divar",
  },
  {
    name: "Alibaba",
    alt: "Alibaba",
    href: "https://www.alibaba.ir",
    src: "https://placehold.co/150x60.png?text=Alibaba",
  },
  {
    name: "Yektanet",
    alt: "Yektanet",
    href: "https://www.yektanet.com",
    src: "https://placehold.co/150x60.png?text=Yektanet",
  },
  {
    name: "MCI",
    alt: "MCI",
    href: "https://www.mci.ir",
    src: "https://placehold.co/150x60.png?text=MCI",
  },
];

export default function ImportantBrands() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-6 text-center">
        <h3 className="text-3xl font-bold mb-4 gold-text">
          به ما اعتماد کرده‌اند
        </h3>
        <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
          برترین شرکت‌های ایران برای جذب استعدادهای برتر از پلتفرم ما استفاده
          می‌کنند.
        </p>
      </div>
      <div className="logos">
        <div className="logos-slide">
          {brands.map((brand) => (
            <span key={brand.name} data-tooltip={brand.name}>
              <Link href={brand.href}>
                <Image
                  src={brand.src}
                  alt={brand.alt}
                  width={150}
                  height={60}
                  className="object-contain"
                  unoptimized
                />
              </Link>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
