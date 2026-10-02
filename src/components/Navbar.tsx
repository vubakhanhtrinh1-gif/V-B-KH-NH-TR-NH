import React from 'react';
import { Layers } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenPlanner: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  onOpenPlanner,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Single text wordmark */}
        <a 
          href="#top" 
          onClick={(e) => { e.preventDefault(); onNavigate('hero'); }}
          className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-white hover:text-cyan-400 transition-colors"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20">
            <Layers className="w-4 h-4" />
          </div>
          <span>AI Studio Bridge</span>
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <button
            onClick={() => onNavigate('methods')}
            className={`transition-colors hover:text-white whitespace-nowrap ${
              activeSection === 'methods' ? 'text-cyan-400 font-semibold' : ''
            }`}
          >
            5 Phương Pháp Ghép
          </button>
          <button
            onClick={() => onNavigate('wizard')}
            className={`transition-colors hover:text-white whitespace-nowrap ${
              activeSection === 'wizard' ? 'text-cyan-400 font-semibold' : ''
            }`}
          >
            Trắc Nghiệm Chọn Cách
          </button>
          <button
            onClick={() => onNavigate('sandboxes')}
            className={`transition-colors hover:text-white whitespace-nowrap ${
              activeSection === 'sandboxes' ? 'text-cyan-400 font-semibold' : ''
            }`}
          >
            Sandbox Thử Nghiệm
          </button>
          <button
            onClick={() => onNavigate('comparison')}
            className={`transition-colors hover:text-white whitespace-nowrap ${
              activeSection === 'comparison' ? 'text-cyan-400 font-semibold' : ''
            }`}
          >
            Bảng So Sánh
          </button>
          <button
            onClick={() => onNavigate('planner')}
            className={`transition-colors hover:text-white whitespace-nowrap ${
              activeSection === 'planner' ? 'text-cyan-400 font-semibold' : ''
            }`}
          >
            Lập Blueprint
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenPlanner}
            className="px-4 py-2 text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-lg hover:from-cyan-300 hover:to-blue-300 transition-all shadow-md shadow-cyan-500/20 whitespace-nowrap active:scale-95"
          >
            Tạo Kế Hoạch Ghép
          </button>
        </div>
      </div>
    </header>
  );
};
