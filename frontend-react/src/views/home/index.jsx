export default function Home() {
  return (
    <div className="p-6 bg-white shadow rounded-md max-w-2xl mx-auto mt-10">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">Selamat Datang</h1>
      <p className="text-gray-700 mb-6">
        Ini adalah halaman utama website. Silakan klik tombol "REGISTER" untuk mendaftar atau "LOGIN" untuk masuk.
      </p>
      <div className="flex space-x-4">
        <a href="/register" className="px-4 py-2 bg-gray-500 hover:bg-blue-600 text-white rounded transition">REGISTER</a>
        <a href="/login" className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition">LOGIN</a>
      </div>
    </div>
  );
}
