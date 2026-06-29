import { Footer } from '@/components/footer/Footer';
import { certifications } from '@/pages/certifications/_components/constant';
import { FaFacebook } from 'react-icons/fa';
import { HiAcademicCap, HiExternalLink } from 'react-icons/hi';
import { IoIosArrowBack } from 'react-icons/io';
import { Link, useParams } from 'react-router-dom';

export const CertificateDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const certificate = certifications.find(cert => cert.id === id);

  if (!certificate) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-300">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-red-500 dark:text-red-400">Certificate not found</h1>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 dark:hover:text-emerald-300 transition-colors"
          >
            <IoIosArrowBack />
            Back to Portfolio
          </Link>
        </div>
      </main>
    );
  }

  const imageSrc = certificate.image?.replace('@/assets/', '/src/assets/');

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-300">
      {/* ── Top Navigation ── */}
      <div className="sticky top-0 z-20 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200 dark:border-white/5 px-6 py-3 transition-colors duration-300">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <IoIosArrowBack className="text-base" />
            Back to Portfolio
          </Link>
        </div>
      </div>

      {/* ── Hero Section ── */}
      <section className="relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-emerald-400/8 dark:bg-emerald-500/10 blur-3xl" />
          <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-teal-400/5 dark:bg-teal-500/5 blur-2xl" />
        </div>

        <div className="relative max-w-4xl mx-auto px-6 pt-12 pb-8 text-center space-y-4">
          {/* Event badge */}
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-500/10 border border-emerald-300 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs font-semibold tracking-widest uppercase">
            <HiAcademicCap className="text-sm" />
            EMPIRE 2026
          </span>

          {/* Certificate name */}
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-gray-800 via-emerald-700 to-emerald-500 dark:from-white dark:via-emerald-100 dark:to-emerald-400 bg-clip-text text-transparent leading-tight">
            {certificate.name}
          </h1>

          {/* Award badge (only for best-paper) */}
          {'award' in certificate && certificate.award && (
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-amber-50 dark:bg-gradient-to-r dark:from-amber-500/20 dark:to-yellow-400/20 border border-amber-300 dark:border-amber-400/40 text-amber-700 dark:text-amber-300 font-bold text-sm tracking-wide shadow-md shadow-amber-100 dark:shadow-amber-500/10">
              🏆 {certificate.award}
            </div>
          )}
        </div>
      </section>

      {/* ── Main Content ── */}
      <section className="max-w-4xl mx-auto px-6 pb-16 space-y-8">
        {/* Certificate Image */}
        {imageSrc && (
          <div className="relative group rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-xl dark:shadow-2xl shadow-gray-200/80 dark:shadow-black/50">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 dark:from-white/5 to-transparent pointer-events-none z-10 rounded-2xl" />
            <img
              src={imageSrc}
              alt={`${certificate.name} certificate`}
              className="w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              loading="lazy"
            />
          </div>
        )}

        {/* Description Card */}
        {certificate.description && (
          <div className="relative rounded-2xl bg-emerald-50 dark:bg-gradient-to-br dark:from-emerald-950/90 dark:to-teal-950/60 border border-emerald-200 dark:border-emerald-500/20 p-6 overflow-hidden shadow-sm dark:shadow-lg dark:shadow-emerald-500/5 transition-colors duration-300">
            <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-emerald-200/30 dark:bg-emerald-500/5 blur-2xl pointer-events-none" />
            <div className="flex gap-3 items-start">
              <span className="mt-1 shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-emerald-200 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400">
                <HiAcademicCap className="text-lg" />
              </span>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
                {certificate.description}
              </p>
            </div>
          </div>
        )}

        {/* Meta Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Issuer */}
          <div className="flex gap-4 items-start p-5 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/8 shadow-sm dark:shadow-none transition-all duration-300">
            <div className="space-y-0.5">
              <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-widest font-semibold">
                Issued by
              </p>
              <p className="text-sm text-gray-800 dark:text-white font-medium leading-snug">{certificate.issuer}</p>
            </div>
          </div>

          {/* Date */}
          <div className="flex gap-4 items-start p-5 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/8 shadow-sm dark:shadow-none transition-all duration-300">
            <div className="space-y-0.5">
              <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-widest font-semibold">
                Date Awarded
              </p>
              <p className="text-sm text-gray-800 dark:text-white font-medium">{certificate.date}</p>
            </div>
          </div>

          {/* Paper Title */}
          {'paperTitle' in certificate && certificate.paperTitle && (
            <div className="sm:col-span-2 flex gap-4 items-start p-5 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/8 shadow-sm dark:shadow-none transition-all duration-300">
              <div className="space-y-0.5">
                <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-widest font-semibold">
                  Research Paper
                </p>
                <p className="text-sm text-gray-800 dark:text-white font-medium leading-snug italic">
                  "{certificate.paperTitle}"
                </p>
              </div>
            </div>
          )}

          {/* Facebook Post URL */}
          {'url' in certificate && certificate.url && (
            <div className="sm:col-span-2">
              <a
                href={certificate.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex gap-4 items-center p-5 rounded-xl bg-blue-50 dark:bg-[#1877F2]/10 border border-blue-200 dark:border-[#1877F2]/30 shadow-sm dark:shadow-none transition-all duration-300"
              >
                <div className="shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 dark:bg-[#1877F2]/20 text-[#1877F2]">
                  <FaFacebook className="text-lg" />
                </div>
                <div className="flex-1 min-w-0 space-y-0.5">
                  <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-widest font-semibold">
                    Facebook Post
                  </p>
                  <p className="text-sm text-blue-600 dark:text-[#60a5fa] font-medium truncate">{certificate.url}</p>
                </div>
                <HiExternalLink className="shrink-0 text-[#156cdf] dark:text-[#81b7ff] text-lg opacity-50" />
              </a>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 dark:border-white/5" />

        {/* Footer CTA */}
        <div className="text-center space-y-3">
          <p className="text-gray-400 dark:text-gray-500 text-sm">
            Presented at Cavite State University – Trece Martires City Campus
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded bg-black dark:bg-white text-white dark:text-black text-sm font-semibold"
          >
            <IoIosArrowBack />
            Back to Portfolio
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
};
