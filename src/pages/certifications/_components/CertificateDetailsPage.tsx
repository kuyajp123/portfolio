import { Footer } from '@/components/footer/Footer';
import { SubpageHeader } from '@/components/layout/SubpageHeader';
import { Badge } from '@/components/ui/Badge';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { EditorialImageViewer, type ViewerItem } from '@/components/ui/EditorialImageViewer';
import { certifications } from '@/pages/certifications/_components/constant';
import { useState } from 'react';
import { FaFacebook } from 'react-icons/fa';
import { FiArrowUpRight, FiAward } from 'react-icons/fi';
import { Link, useParams } from 'react-router-dom';

export const CertificateDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const certificate = certifications.find(cert => cert.id === id);
  const [activeViewerIndex, setActiveViewerIndex] = useState(-1);

  if (!certificate) {
    return (
      <div className="min-h-[100dvh] bg-grid-pattern flex flex-col items-center justify-center p-6">
        <div className="text-center space-y-4">
          <h1 className="font-mono text-xl font-bold text-gray-900 dark:text-gray-100">Certificate not found</h1>
          <Link
            to="/"
            className="inline-flex items-center gap-1 font-mono text-xs text-sky-600 dark:text-sky-400 hover:underline"
          >
            <span>Return to portfolio</span>
          </Link>
        </div>
      </div>
    );
  }

  const imageSrcs = certificate.images?.map(img => img.replace('@/assets/', '/src/assets/'));

  const viewerItems: ViewerItem[] = (imageSrcs ?? []).map((src, idx) => ({
    src,
    title: `${certificate.name} (${String(idx + 1)})`,
    caption: certificate.description ?? certificate.paperTitle,
    category: certificate.award ?? 'Certificate Document',
    date: certificate.date,
  }));

  return (
    <div className="min-h-[100dvh] bg-grid-pattern flex flex-col items-center overflow-x-clip">
      {/* Top Sticky Liquid Glass Header */}
      <SubpageHeader />

      {/* Main Content */}
      <main className="w-full max-w-3xl px-4 sm:px-6 py-4 flex-1 flex flex-col gap-8">
        <SectionHeader
          number="06"
          title="Research & Certification"
          subtitle="Academic accolades, conference participation, and verified completion records."
        />

        {/* Certificate Overview Block */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="font-sans text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">
              {certificate.name}
            </h1>
            {certificate.award && (
              <Badge variant="award">
                <FiAward size={12} />
                <span>{certificate.award}</span>
              </Badge>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs text-gray-500 dark:text-gray-400">
            <span>{certificate.issuer}</span>
            <span>/</span>
            <span>{certificate.date}</span>
          </div>

          {certificate.description && (
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-normal pt-1">
              {certificate.description}
            </p>
          )}

          {certificate.paperTitle && (
            <div className="p-4 rounded-xl border border-black/8 dark:border-white/10 bg-black/2 dark:bg-white/3 mt-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 block mb-1">
                Research Paper Title
              </span>
              <p className="font-sans text-sm font-semibold text-gray-900 dark:text-gray-100">
                "{certificate.paperTitle}"
              </p>
            </div>
          )}
        </div>

        {/* Certificate Image Documents */}
        {imageSrcs && imageSrcs.length > 0 && (
          <div className="flex flex-col gap-3">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">
              Documents & Certificates (Click to Expand)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {imageSrcs.map((src, idx) => (
                <div
                  key={src}
                  onClick={() => {
                    setActiveViewerIndex(idx);
                  }}
                  className="group relative overflow-hidden rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 cursor-pointer aspect-[1.414]"
                >
                  <img
                    src={src}
                    alt={`${certificate.name} ${String(idx + 1)}`}
                    className="w-full h-full object-cover group-hover:scale-102 transition-all duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                    <span className="font-mono text-xs text-white px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-sm">
                      Inspect Document ↗
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* External URL Reference */}
        {certificate.url && (
          <div className="pt-2">
            <a
              href={certificate.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 p-3.5 rounded-xl border border-black/8 dark:border-white/10 bg-black/2 dark:bg-white/3 hover:bg-black/5 dark:hover:bg-white/6 text-xs font-mono text-gray-700 dark:text-gray-300 transition-colors w-full justify-between group"
            >
              <div className="flex items-center gap-2.5">
                <FaFacebook size={16} className="text-[#1877F2]" />
                <span>Conference Proceedings & Verification Post</span>
              </div>
              <FiArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        )}
      </main>

      <Footer />

      <EditorialImageViewer
        isOpen={activeViewerIndex >= 0}
        currentIndex={Math.max(0, activeViewerIndex)}
        onIndexChange={idx => {
          setActiveViewerIndex(idx);
        }}
        onClose={() => {
          setActiveViewerIndex(-1);
        }}
        items={viewerItems}
      />
    </div>
  );
};