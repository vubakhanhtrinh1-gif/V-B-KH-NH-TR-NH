import React from 'react';
import { ArrowRight, GitMerge, Network, Boxes, Sparkles, Database, CheckCircle2 } from 'lucide-react';
import { IntegrationType } from '../types';

interface HeroSectionProps {
  onSelectMethod: (methodId: IntegrationType) => void;
  onStartWizard: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSelectMethod,
  onStartWizard,
}) => {
  return (
    <section className="relative pt-12 pb-16 overflow-hidden border-b border-slate-800/60">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-gradient-to-tr from-cyan-600/15 via-blue-600/15 to-purple-600/10 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-800/60 text-cyan-300">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <span>Giải đáp kỹ thuật Google AI Studio</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            Có ghép nối được 2 phần ở <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">2 AI Studio</span> không?
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            <strong className="text-cyan-400 font-semibold">CÓ, HOÀN TOÀN ĐƯỢC!</strong> Bạn có thể ghép nối linh hoạt tùy theo việc hai phần đó là <strong>hai ứng dụng Web (Codebase)</strong> hay <strong>hai Prompt AI Gemini</strong>.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onStartWizard}
              className="px-5 py-2.5 text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-lg hover:from-cyan-300 hover:to-blue-300 transition-all shadow-lg shadow-cyan-500/20 inline-flex items-center gap-2 active:scale-95"
            >
              <span>Trắc nghiệm tìm cách ghép phù hợp</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="#methods"
              className="px-5 py-2.5 text-sm font-semibold text-slate-200 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 rounded-lg transition-colors inline-flex items-center gap-2"
            >
              <span>Xem 5 phương pháp kỹ thuật</span>
            </a>
          </div>
        </div>

        {/* 2 Scenarios Split View */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* Card Scenario 1 */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 relative group hover:border-cyan-500/50 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                <Boxes className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-2.5 py-0.5 rounded border border-cyan-800/40">
                Trường hợp 1
              </span>
            </div>

            <h3 className="text-lg font-semibold text-white mb-2">
              Hai Web Applet (Codebase React / Express)
            </h3>
            <p className="text-sm text-slate-400 mb-4 leading-relaxed">
              Bạn tạo 2 dự án riêng biệt trên AI Studio Build (ví dụ: một bên là Dashboard, một bên là Tool tạo ảnh hoặc Chatbot AI).
            </p>

            <div className="space-y-2 text-xs text-slate-300 border-t border-slate-800/80 pt-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong>Gộp mã nguồn:</strong> Copy components và router vào 1 App (Tối ưu nhất)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong>Gọi REST API:</strong> App 1 fetch() sang App 2 qua URL Cloud Run</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong>Nhúng iframe:</strong> Dùng window.postMessage giao tiếp 2 chiều</span>
              </div>
            </div>

            <div className="mt-5 flex gap-2">
              <button
                onClick={() => onSelectMethod('code_merge')}
                className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1"
              >
                <span>Xem cách gộp mã nguồn</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card Scenario 2 */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 relative group hover:border-purple-500/50 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono text-purple-400 bg-purple-950/60 px-2.5 py-0.5 rounded border border-purple-800/40">
                Trường hợp 2
              </span>
            </div>

            <h3 className="text-lg font-semibold text-white mb-2">
              Hai Prompt / AI Task (Prompt Chaining)
            </h3>
            <p className="text-sm text-slate-400 mb-4 leading-relaxed">
              Bạn có 2 System Instructions hoặc 2 bước xử lý AI (ví dụ: Bước 1 lọc dữ liệu & trích xuất JSON, Bước 2 sinh bài viết chuyên sâu).
            </p>

            <div className="space-y-2 text-xs text-slate-300 border-t border-slate-800/80 pt-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong>Pipeline Chaining:</strong> Output bước 1 làm input bước 2</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong>Structured JSON:</strong> Ràng buộc schema đầu ra chính xác 100%</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong>Kết hợp đa Model:</strong> Flash cho bước nhanh, Pro cho bước khó</span>
              </div>
            </div>

            <div className="mt-5 flex gap-2">
              <button
                onClick={() => onSelectMethod('prompt_chaining')}
                className="text-xs font-semibold text-purple-400 hover:text-purple-300 inline-flex items-center gap-1"
              >
                <span>Xem cách ghép chuỗi Prompt</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Quick Architecture Mini Diagram */}
        <div className="mt-10 p-4 bg-slate-900/40 border border-slate-800/60 rounded-xl max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-cyan-400"></span>
            <span className="text-slate-200 font-medium">AI Studio Phần 1</span>
            <span className="text-slate-500 font-mono">(Frontend / Applet A / Prompt 1)</span>
          </div>

          <div className="flex items-center gap-2 text-cyan-400 font-mono text-[11px] bg-cyan-950/40 px-3 py-1 rounded-full border border-cyan-800/40">
            <GitMerge className="w-3.5 h-3.5" />
            <span>Bridge: REST API / Code Merge / postMessage / Pipeline</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-blue-500"></span>
            <span className="text-slate-200 font-medium">AI Studio Phần 2</span>
            <span className="text-slate-500 font-mono">(Backend / Applet B / Prompt 2)</span>
          </div>
        </div>
      </div>
    </section>
  );
};
