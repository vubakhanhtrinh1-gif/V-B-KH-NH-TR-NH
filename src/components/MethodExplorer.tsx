import React, { useState } from 'react';
import { 
  GitMerge, 
  Network, 
  Boxes, 
  Sparkles, 
  Database, 
  Copy, 
  Check, 
  AlertCircle, 
  CheckCircle2, 
  Code2,
  Terminal,
  ExternalLink
} from 'lucide-react';
import { INTEGRATION_METHODS } from '../data/integrationMethods';
import { IntegrationType } from '../types';

interface MethodExplorerProps {
  selectedMethod: IntegrationType;
  onSelectMethod: (id: IntegrationType) => void;
}

export const MethodExplorer: React.FC<MethodExplorerProps> = ({
  selectedMethod,
  onSelectMethod,
}) => {
  const [copiedSnippetIndex, setCopiedSnippetIndex] = useState<number | null>(null);

  const currentMethod = INTEGRATION_METHODS.find((m) => m.id === selectedMethod) || INTEGRATION_METHODS[0];

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippetIndex(index);
    setTimeout(() => setCopiedSnippetIndex(null), 2000);
  };

  const getMethodIcon = (id: IntegrationType) => {
    switch (id) {
      case 'code_merge':
        return <GitMerge className="w-4 h-4 text-cyan-400" />;
      case 'rest_api':
        return <Network className="w-4 h-4 text-blue-400" />;
      case 'iframe_postmessage':
        return <Boxes className="w-4 h-4 text-indigo-400" />;
      case 'prompt_chaining':
        return <Sparkles className="w-4 h-4 text-purple-400" />;
      case 'shared_database':
        return <Database className="w-4 h-4 text-emerald-400" />;
    }
  };

  return (
    <section id="methods" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="space-y-3 mb-8">
        <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
          Hướng Dẫn Kỹ Thuật Chuyên Sâu
        </div>
        <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
          5 Phương Pháp Ghép Nối Chi Tiết & Code Mẫu
        </h2>
        <p className="text-sm text-slate-400 max-w-2xl">
          Chọn phương pháp phù hợp với kiến trúc dự án của bạn để xem quy trình từng bước, sơ đồ hoạt động và mã nguồn mẫu.
        </p>
      </div>

      {/* Method Tabs - Clean segmented control */}
      <div className="flex items-center gap-1.5 p-1.5 bg-slate-900 border border-slate-800 rounded-xl overflow-x-auto no-scrollbar mb-8">
        {INTEGRATION_METHODS.map((m) => {
          const isSelected = m.id === selectedMethod;
          return (
            <button
              key={m.id}
              onClick={() => onSelectMethod(m.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-slate-800 text-white shadow-sm border border-slate-700/80 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              {getMethodIcon(m.id)}
              <span>{m.title.split('(')[0]}</span>
              {m.id === 'code_merge' && (
                <span className="text-[10px] bg-cyan-950 text-cyan-300 px-1.5 py-0.5 rounded border border-cyan-800/50">
                  Khuyên dùng
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Main Content Area */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8">
        {/* Method Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="font-semibold text-cyan-400">{currentMethod.badge}</span>
              <span>·</span>
              <span>Độ khó: <strong className="text-slate-200">{currentMethod.difficulty}</strong></span>
              <span>·</span>
              <span>Tốc độ: <strong className="text-emerald-400 font-mono">{currentMethod.speed}</strong></span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              {currentMethod.title}
            </h3>
            <p className="text-sm text-slate-300">
              {currentMethod.tagline}
            </p>
          </div>

          <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 text-xs text-slate-300 max-w-md shrink-0">
            <span className="text-slate-500 font-semibold block mb-1">Trường hợp nên áp dụng:</span>
            <span>{currentMethod.recommendedFor}</span>
          </div>
        </div>

        {/* Pros & Cons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-emerald-950/15 border border-emerald-900/30 rounded-xl space-y-2">
            <div className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>Ưu điểm</span>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {currentMethod.pros.map((pro, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold shrink-0">•</span>
                  <span>{pro}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 bg-amber-950/15 border border-amber-900/30 rounded-xl space-y-2">
            <div className="text-xs font-semibold text-amber-400 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4" />
              <span>Lưu ý & Điểm cần chú ý</span>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {currentMethod.cons.map((con, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold shrink-0">•</span>
                  <span>{con}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Step-by-Step Implementation Steps with Code */}
        <div className="space-y-6">
          <h4 className="text-base sm:text-lg font-semibold text-white flex items-center gap-2">
            <Code2 className="w-4 h-4 text-cyan-400" />
            <span>Quy Trình Triển Khai Từng Bước</span>
          </h4>

          <div className="space-y-6">
            {currentMethod.steps.map((step, idx) => (
              <div 
                key={idx} 
                className="bg-slate-950/80 border border-slate-800/90 rounded-xl p-5 space-y-3"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <h5 className="text-sm sm:text-base font-semibold text-white">
                      {step.title}
                    </h5>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {step.codeSnippet && (
                  <div className="mt-3 relative rounded-lg overflow-hidden border border-slate-800 bg-slate-900/95 font-mono text-xs">
                    <div className="flex items-center justify-between px-3 py-1.5 bg-slate-800/60 border-b border-slate-800 text-[11px] text-slate-400">
                      <div className="flex items-center gap-2">
                        <Terminal className="w-3 h-3 text-cyan-400" />
                        <span>{step.language || 'typescript'}</span>
                      </div>
                      <button
                        onClick={() => handleCopy(step.codeSnippet!, idx)}
                        className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white transition-colors bg-slate-700/40 px-2 py-0.5 rounded"
                      >
                        {copiedSnippetIndex === idx ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400">Đã sao chép</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Sao chép mã</span>
                          </>
                        )}
                      </button>
                    </div>

                    <pre className="p-4 overflow-x-auto text-slate-200 leading-relaxed text-[12px] font-mono">
                      <code>{step.codeSnippet}</code>
                    </pre>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Pro Tip Box */}
        <div className="p-4 bg-cyan-950/20 border border-cyan-800/40 rounded-xl flex items-start gap-3 text-xs text-slate-300">
          <AlertCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-semibold text-white">Mẹo kỹ sư từ Google AI Studio:</span>
            <p className="text-slate-400 leading-relaxed">
              Nếu bạn đang dùng AI Studio Build để lập trình ứng dụng, cách tối ưu nhất luôn là <strong>Gộp mã nguồn (Code Merge)</strong>. 
              Bạn có thể yêu cầu AI Studio trực tiếp: <em>"Hãy tạo thêm component tính năng X từ dự án thứ hai của tôi vào thư mục /src/features/ và gắn thêm tab trên thanh điều hướng"</em>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
