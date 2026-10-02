import React from 'react';
import { Layers, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-500">
        <div className="flex items-center gap-2 text-slate-400">
          <Layers className="w-4 h-4 text-cyan-400" />
          <span className="font-semibold text-white">AI Studio Bridge & Integration Suite</span>
          <span>·</span>
          <span>Cẩm nang kiến trúc giải pháp Google AI Studio</span>
        </div>

        <div className="flex items-center gap-6">
          <a 
            href="https://aistudio.google.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-slate-300 transition-colors flex items-center gap-1"
          >
            <span>Google AI Studio</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <a 
            href="https://ai.google.dev/gemini-api/docs" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-slate-300 transition-colors flex items-center gap-1"
          >
            <span>Gemini API Docs</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </footer>
  );
};
