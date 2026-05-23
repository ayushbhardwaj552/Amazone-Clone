export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-900">
      <div className="max-w-md rounded-xl border border-gray-200 bg-white p-10 text-center shadow-sm">
        <h1 className="text-4xl font-bold">404</h1>
        <p className="mt-4 text-lg">Page not found.</p>
        <p className="mt-2 text-sm text-gray-500">
          The page you are looking for does not exist or may have been moved.
        </p>
      </div>
    </main>
  );
}
