import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="max-padd-container flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 text-center">404 - Page Not Found</h1>
      <p className="mt-4 text-gray-600">
        The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="mt-6 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-all"
      >
        Go Back Home
      </Link>
    </div>
  );
}