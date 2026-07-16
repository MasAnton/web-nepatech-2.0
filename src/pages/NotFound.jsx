import { Link } from 'react-router-dom';
import Seo from '../components/Seo';

function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 text-center">
      <Seo title="Halaman Tidak Ditemukan" noIndex />
      <div>
        <h1 className="text-4xl font-bold text-dark">404</h1>
        <p className="mt-3 text-lg text-slate-600">Halaman yang Anda cari tidak ditemukan.</p>
        <Link to="/" className="mt-6 inline-block rounded-full bg-primary px-6 py-3 font-semibold text-white">
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
