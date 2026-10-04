import React, { useState } from 'react';
import { Download, File, Clock, Check, ExternalLink, ArrowRight } from 'lucide-react';
import { useStudent } from '../contexts/StudentContext';
import { Link } from 'react-router-dom';

const DownloadsPage: React.FC = () => {
  const { recentViews } = useStudent();
  const [downloadToast, setDownloadToast] = useState<string | null>(null);

  // Blend recent access items with sample completed downloads
  const defaultDownloads = [
    { id: 'dl-1', title: 'Analog Electronics (EXTC201) End Sem 2025 Solved.pdf', type: 'Question Paper', size: '2.4 MB', date: 'Today' },
    { id: 'dl-2', title: 'Sedra & Smith Microelectronic Circuits Unit 2 Notes.pdf', type: 'Lecture Notes', size: '5.1 MB', date: 'Yesterday' },
    { id: 'dl-3', title: 'Network Theory Two-Port Parameter Practice Set.pdf', type: 'Practice Set', size: '1.8 MB', date: 'Oct 2, 2026' },
    { id: 'dl-4', title: 'SOIT First Year Engineering Physics Lab Manual.pdf', type: 'Lab Manual', size: '8.2 MB', date: 'Sep 28, 2026' }
  ];

  const handleReDownload = (title: string) => {
    setDownloadToast(`Starting download: ${title}`);
    setTimeout(() => setDownloadToast(null), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6">
      
      {/* Toast Alert */}
      {downloadToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-forest text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 border border-sage/30 text-xs font-medium">
          <Check size={16} className="text-mustard shrink-0" />
          <span>{downloadToast}</span>
        </div>
      )}

      <div className="mb-8">
        <span className="section-label text-forest dark:text-sage mb-1 block">Offline Storage</span>
        <h1 className="text-4xl font-serif text-forest dark:text-white mb-2">Your Downloads</h1>
        <p className="text-ink/70 dark:text-dark-text/70 text-sm">
          Track course materials, solved question papers, and manuals downloaded for offline study.
        </p>
      </div>

      <div className="space-y-3">
        {defaultDownloads.map((item) => (
          <div 
            key={item.id} 
            className="bg-white dark:bg-dark-card rounded-2xl p-4.5 flex items-center gap-4 border border-sage/20 dark:border-dark-border shadow-xs hover:border-forest transition-colors"
          >
            <div className="w-11 h-11 rounded-xl bg-forest/10 dark:bg-forest/30 flex items-center justify-center text-forest dark:text-sage shrink-0 font-bold">
              <File size={22} />
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm text-ink dark:text-white truncate">{item.title}</h3>
              <div className="flex items-center gap-2 text-xs font-mono text-ink/60 dark:text-dark-text/60 mt-1">
                <span>{item.type}</span>
                <span>•</span>
                <span>{item.size}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Clock size={11} /> {item.date}</span>
              </div>
            </div>

            <button 
              onClick={() => handleReDownload(item.title)}
              className="p-2.5 bg-cream/50 dark:bg-dark-bg text-forest dark:text-sage hover:bg-forest hover:text-white rounded-xl transition-colors shrink-0"
              title="Re-download File"
            >
              <Download size={16} />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-sage/20 dark:border-dark-border flex flex-wrap items-center justify-between gap-4">
        <p className="text-xs text-ink/60 dark:text-dark-text/60">
          Downloads are saved locally to your device’s browser storage cache.
        </p>
        <Link to="/academics" className="btn-primary text-xs py-2 px-4 flex items-center gap-1.5">
          <span>Browse More Materials</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
};

export default DownloadsPage;
