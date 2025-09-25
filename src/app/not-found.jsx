import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-yellow-400 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-white mb-4">صفحه یافت نشد</h2>
        <p className="text-gray-400 mb-8">
          متأسفانه صفحه‌ای که دنبال آن می‌گردید وجود ندارد.
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 bg-yellow-400 text-gray-900 font-medium rounded-lg hover:bg-yellow-300 transition-colors"
        >
          بازگشت به صفحه اصلی
        </Link>
      </div>
    </div>
  );
}
