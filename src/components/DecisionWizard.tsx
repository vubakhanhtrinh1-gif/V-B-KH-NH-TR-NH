import React, { useState } from 'react';
import { ArrowRight, HelpCircle, CheckCircle, RefreshCw, Zap } from 'lucide-react';
import { IntegrationType } from '../types';

interface DecisionWizardProps {
  onSelectMethod: (methodId: IntegrationType) => void;
}

export const DecisionWizard: React.FC<DecisionWizardProps> = ({ onSelectMethod }) => {
  const [step, setStep] = useState<number>(1);
  const [answer1, setAnswer1] = useState<string>(''); // 'two_apps' | 'frontend_backend' | 'two_prompts' | 'shared_data'
  const [answer2, setAnswer2] = useState<string>(''); // 'single_url' | 'keep_separate'
  const [answer3, setAnswer3] = useState<string>(''); // 'can_code' | 'no_code_touch'

  const resetWizard = () => {
    setStep(1);
    setAnswer1('');
    setAnswer2('');
    setAnswer3('');
  };

  // Determine recommendation based on answers
  const getRecommendation = (): {
    methodId: IntegrationType;
    title: string;
    description: string;
    time: string;
    why: string;
  } => {
    if (answer1 === 'two_prompts') {
      return {
        methodId: 'prompt_chaining',
        title: 'Ghép Chuỗi AI Pipeline (Prompt Chaining)',
        description: 'Kết nối output của Prompt 1 làm input cho Prompt 2 bằng TypeScript SDK @google/genai.',
        time: 'Khoảng 10 - 15 phút',
        why: 'Vì 2 phần của bạn là 2 bước suy luận của mô hình AI, chuỗi pipeline là cách chuẩn chỉ nhất để đảm bảo chất lượng phản hồi cao nhất.',
      };
    }

    if (answer1 === 'shared_data') {
      return {
        methodId: 'shared_database',
        title: 'Đồng Bộ Qua Cơ Sở Dữ Liệu Dùng Chung (Firebase / Cloud SQL)',
        description: 'Cả 2 app cùng chia sẻ chung một Database để đọc/ghi dữ liệu thời gian thực.',
        time: 'Khoảng 20 - 30 phút',
        why: 'Khi hai ứng dụng cần dùng chung danh sách người dùng, đơn hàng hoặc lịch sử tác vụ mà không cần gọi trực tiếp nhau.',
      };
    }

    if (answer2 === 'keep_separate' && answer3 === 'no_code_touch') {
      return {
        methodId: 'iframe_postmessage',
        title: 'Nhúng Giao Diện Iframe & window.postMessage',
        description: 'Giữ nguyên 2 app trên 2 link AI Studio riêng và nhúng màn hình app này vào trong app kia.',
        time: 'Khoảng 5 - 10 phút',
        why: 'Bạn muốn giữ nguyên 100% code của App B mà không cần tách các component ra để viết lại.',
      };
    }

    if (answer1 === 'frontend_backend' || answer2 === 'keep_separate') {
      return {
        methodId: 'rest_api',
        title: 'Kết Nối Qua REST API Endpoint (Express / Cloud Run)',
        description: 'App 1 gọi HTTP POST sang App 2 thông qua URL Cloud Run được cấp sẵn.',
        time: 'Khoảng 15 - 20 phút',
        why: 'Rất thích hợp khi bạn muốn phân tách rõ ràng vai trò Client và Server, hoặc App 2 chạy xử lý background nặng.',
      };
    }

    // Default best practice: code merge
    return {
      methodId: 'code_merge',
      title: 'Gộp Mã Nguồn Vào Một Codebase Duy Nhất (Khuyên Dùng Nhất)',
      description: 'Chuyển các components của App B thành một thư mục tính năng trong App A và tạo thanh điều hướng chuyển tab.',
      time: 'Khoảng 15 - 25 phút',
      why: 'Cho trải nghiệm người dùng mượt mà nhất, tải trang nhanh tức thì, không bị chặn CORS và tiết kiệm tài nguyên Cloud Run.',
    };
  };

  const isCompleted = step > 3 || (answer1 === 'two_prompts') || (answer1 === 'shared_data');
  const recommendation = getRecommendation();

  return (
    <section id="wizard" className="py-16 border-b border-slate-800/80 bg-slate-900/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-8">
          <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full bg-blue-950/60 border border-blue-800/40 text-blue-300">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Trợ lý chẩn đoán thông minh</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Nên chọn cách ghép nào cho dự án của bạn?
          </h2>
          <p className="text-sm text-slate-400">
            Trả lời 2-3 câu hỏi ngắn để nhận ngay giải pháp kỹ thuật tối ưu và mã nguồn mẫu.
          </p>
        </div>

        {!isCompleted ? (
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 sm:p-8 shadow-xl">
            {/* Progress indicators */}
            <div className="flex items-center justify-between text-xs text-slate-400 mb-6 border-b border-slate-800 pb-4">
              <span>Bước {step} / 3</span>
              <span className="text-cyan-400 font-mono">
                {step === 1 ? 'Loại dự án' : step === 2 ? 'Mô hình triển khai' : 'Mức độ can thiệp'}
              </span>
            </div>

            {/* Question 1 */}
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="text-base sm:text-lg font-semibold text-white">
                  1. Hai phần bạn đang có ở AI Studio thuộc loại nào?
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      setAnswer1('two_apps');
                      setStep(2);
                    }}
                    className="p-4 text-left rounded-lg border border-slate-800 bg-slate-950/60 hover:border-cyan-500/60 hover:bg-slate-800/50 transition-all group"
                  >
                    <div className="font-semibold text-sm text-white group-hover:text-cyan-400 mb-1">
                      Hai Web Applet hoàn chỉnh
                    </div>
                    <div className="text-xs text-slate-400 leading-relaxed">
                      Cả 2 đều có giao diện người dùng (UI), muốn gom lại thành 1 web app thống nhất.
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setAnswer1('frontend_backend');
                      setStep(2);
                    }}
                    className="p-4 text-left rounded-lg border border-slate-800 bg-slate-950/60 hover:border-cyan-500/60 hover:bg-slate-800/50 transition-all group"
                  >
                    <div className="font-semibold text-sm text-white group-hover:text-cyan-400 mb-1">
                      1 Frontend UI + 1 Backend API
                    </div>
                    <div className="text-xs text-slate-400 leading-relaxed">
                      Một applet làm giao diện, một applet làm server xử lý logic AI hoặc backend Express.
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setAnswer1('two_prompts');
                      setStep(4); // Instant result
                    }}
                    className="p-4 text-left rounded-lg border border-slate-800 bg-slate-950/60 hover:border-purple-500/60 hover:bg-slate-800/50 transition-all group"
                  >
                    <div className="font-semibold text-sm text-white group-hover:text-purple-400 mb-1">
                      Hai Prompt / Tác vụ AI Gemini
                    </div>
                    <div className="text-xs text-slate-400 leading-relaxed">
                      Bạn có 2 System Instruction trong AI Studio muốn nối tiếp (Prompt 1 xong đến Prompt 2).
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setAnswer1('shared_data');
                      setStep(4); // Instant result
                    }}
                    className="p-4 text-left rounded-lg border border-slate-800 bg-slate-950/60 hover:border-emerald-500/60 hover:bg-slate-800/50 transition-all group"
                  >
                    <div className="font-semibold text-sm text-white group-hover:text-emerald-400 mb-1">
                      Hai App độc lập muốn đồng bộ dữ liệu
                    </div>
                    <div className="text-xs text-slate-400 leading-relaxed">
                      App A tạo đơn hoặc nhập liệu, App B tự động nhận dữ liệu thời gian thực.
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* Question 2 */}
            {step === 2 && (
              <div className="space-y-4">
                <h3 className="text-base sm:text-lg font-semibold text-white">
                  2. Bạn muốn người dùng truy cập sản phẩm như thế nào?
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      setAnswer2('single_url');
                      setStep(3);
                    }}
                    className="p-4 text-left rounded-lg border border-slate-800 bg-slate-950/60 hover:border-cyan-500/60 hover:bg-slate-800/50 transition-all group"
                  >
                    <div className="font-semibold text-sm text-white group-hover:text-cyan-400 mb-1">
                      Vào 1 liên kết duy nhất (Giao diện liền mạch)
                    </div>
                    <div className="text-xs text-slate-400 leading-relaxed">
                      Người dùng chỉ mở 1 trang web và chuyển đổi giữa 2 tính năng qua menu/tabs.
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setAnswer2('keep_separate');
                      setStep(3);
                    }}
                    className="p-4 text-left rounded-lg border border-slate-800 bg-slate-950/60 hover:border-cyan-500/60 hover:bg-slate-800/50 transition-all group"
                  >
                    <div className="font-semibold text-sm text-white group-hover:text-cyan-400 mb-1">
                      Giữ 2 link Cloud Run riêng biệt
                    </div>
                    <div className="text-xs text-slate-400 leading-relaxed">
                      Hai ứng dụng hoạt động độc lập và chỉ trao đổi dữ liệu ngầm qua mạng.
                    </div>
                  </button>
                </div>
                <div className="pt-2">
                  <button
                    onClick={() => setStep(1)}
                    className="text-xs text-slate-400 hover:text-white"
                  >
                    ← Quay lại câu trước
                  </button>
                </div>
              </div>
            )}

            {/* Question 3 */}
            {step === 3 && (
              <div className="space-y-4">
                <h3 className="text-base sm:text-lg font-semibold text-white">
                  3. Bạn muốn can thiệp code như thế nào?
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      setAnswer3('can_code');
                      setStep(4);
                    }}
                    className="p-4 text-left rounded-lg border border-slate-800 bg-slate-950/60 hover:border-cyan-500/60 hover:bg-slate-800/50 transition-all group"
                  >
                    <div className="font-semibold text-sm text-white group-hover:text-cyan-400 mb-1">
                      Có thể copy file và chỉnh sửa component
                    </div>
                    <div className="text-xs text-slate-400 leading-relaxed">
                      Tôi sẵn sàng copy các file `.tsx` từ App B sang App A để có code gọn gàng, tối ưu nhất.
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setAnswer3('no_code_touch');
                      setStep(4);
                    }}
                    className="p-4 text-left rounded-lg border border-slate-800 bg-slate-950/60 hover:border-cyan-500/60 hover:bg-slate-800/50 transition-all group"
                  >
                    <div className="font-semibold text-sm text-white group-hover:text-cyan-400 mb-1">
                      Không muốn sửa nhiều code của App B
                    </div>
                    <div className="text-xs text-slate-400 leading-relaxed">
                      Muốn giữ nguyên xi App B và chỉ cần nhúng hoặc gọi sang.
                    </div>
                  </button>
                </div>
                <div className="pt-2">
                  <button
                    onClick={() => setStep(2)}
                    className="text-xs text-slate-400 hover:text-white"
                  >
                    ← Quay lại câu trước
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Result Card */
          <div className="bg-slate-900 border border-cyan-500/40 rounded-xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5" />
                  Đề xuất tối ưu cho bạn
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  {recommendation.title}
                </h3>
              </div>

              <button
                onClick={resetWizard}
                className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1 bg-slate-800/60 px-2.5 py-1.5 rounded border border-slate-700 shrink-0"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Chọn lại</span>
              </button>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed mb-4">
              {recommendation.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-950/60 p-4 rounded-lg border border-slate-800/80 mb-6">
              <div>
                <span className="text-slate-500 block mb-0.5">Thời gian thực hiện ước tính:</span>
                <strong className="text-emerald-400 font-medium">{recommendation.time}</strong>
              </div>
              <div>
                <span className="text-slate-500 block mb-0.5">Lý do chọn phương án này:</span>
                <span className="text-slate-300">{recommendation.why}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => onSelectMethod(recommendation.methodId)}
                className="px-5 py-2.5 text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-lg hover:from-cyan-300 hover:to-blue-300 transition-all flex items-center gap-2 shadow-md shadow-cyan-500/20 active:scale-95"
              >
                <span>Xem chi tiết hướng dẫn & code mẫu</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
