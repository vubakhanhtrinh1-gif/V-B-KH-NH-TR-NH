import React, { useState } from 'react';
import { 
  FileCode, 
  Copy, 
  Check, 
  Download, 
  Sparkles, 
  Layers, 
  CheckCircle2 
} from 'lucide-react';
import { IntegrationType } from '../types';

interface PlanGeneratorProps {
  initialMethod?: IntegrationType;
}

export const PlanGenerator: React.FC<PlanGeneratorProps> = ({ initialMethod = 'code_merge' }) => {
  const [appAName, setAppAName] = useState('Ứng dụng A (Giao diện Quản trị / Frontend)');
  const [appBName, setAppBName] = useState('Ứng dụng B (Công cụ AI / Xử lý dữ liệu)');
  const [selectedMethod, setSelectedMethod] = useState<IntegrationType>(initialMethod);
  const [isCopied, setIsCopied] = useState(false);

  const getMethodName = (type: IntegrationType) => {
    switch (type) {
      case 'code_merge': return 'Gộp mã nguồn thành một Web Applet duy nhất';
      case 'rest_api': return 'Kết nối qua REST API (Cloud Run microservices)';
      case 'iframe_postmessage': return 'Nhúng giao diện iframe và truyền tin qua window.postMessage';
      case 'prompt_chaining': return 'Ghép chuỗi 2 Prompt AI Gemini (Pipeline)';
      case 'shared_database': return 'Đồng bộ qua cơ sở dữ liệu chung (Firebase Firestore / Cloud SQL)';
    }
  };

  const generateBlueprintText = () => {
    const methodName = getMethodName(selectedMethod);
    const dateStr = new Date().toLocaleDateString('vi-VN');

    return `# BẢN KẾ HOẠCH GHÉP NỐI 2 DỰ ÁN AI STUDIO
Ngày lập: ${dateStr}

## 1. THÔNG TIN 2 THÀNH PHẦN
- Thành phần 1: ${appAName}
- Thành phần 2: ${appBName}
- Phương pháp lựa chọn: ${methodName}

## 2. KIẾN TRÚC KỸ THUẬT ĐỀ XUẤT
${selectedMethod === 'code_merge' ? `
Mô hình hợp nhất mã nguồn (Unified Applet):
1. Cấu trúc thư mục mới:
   /src/features/part_a/ (Toàn bộ component và logic của "${appAName}")
   /src/features/part_b/ (Toàn bộ component và logic của "${appBName}")
2. App.tsx:
   Đóng vai trò Router hoặc Tabs điều hướng chính giữa 2 tính năng.
3. Chia sẻ dữ liệu:
   Dùng React State hoặc Context API để truyền dữ liệu qua lại không độ trễ.
` : selectedMethod === 'rest_api' ? `
Mô hình Microservices qua Cloud Run:
1. "${appBName}" đóng vai trò Backend Service (Chạy Express):
   - Mở endpoint: POST /api/process
   - Cài đặt middleware: cors({ origin: '*' })
2. "${appAName}" đóng vai trò Client:
   - Gọi fetch(APP_B_URL + '/api/process', { method: 'POST', body: ... })
   - Hiển thị kết quả nhận được từ App B lên giao diện.
` : selectedMethod === 'iframe_postmessage' ? `
Mô hình Nhúng Giao Diện & window.postMessage:
1. "${appAName}" tạo thẻ <iframe> trỏ tới URL Cloud Run của "${appBName}".
2. App A gửi lệnh: iframeRef.current.contentWindow.postMessage({ type: 'COMMAND_FROM_A', payload }, '*')
3. App B lắng nghe: window.addEventListener('message', (event) => { ... })
4. App B phản hồi: window.parent.postMessage({ type: 'RESULT_FROM_B', payload }, '*')
` : selectedMethod === 'prompt_chaining' ? `
Mô hình Chuỗi AI Pipeline (2 Prompts Chaining):
1. Prompt 1 (Phân tích / Trích xuất):
   - Nhiệm vụ: Phân loại dữ liệu thô từ người dùng, xuất JSON Schema chuẩn.
2. Prompt 2 (Tổng hợp / Sáng tạo nội dung):
   - Nhận output JSON từ Prompt 1 làm ngữ cảnh đầu vào (context).
   - Dùng SDK @google/genai với model gemini-2.5-flash hoặc gemini-2.5-pro.
` : `
Mô hình Cơ sở dữ liệu dùng chung (Shared Database):
1. Khởi tạo một Firebase Project dùng chung.
2. Cả "${appAName}" và "${appBName}" đều sử dụng chung file cấu hình src/firebase.ts.
3. App A ghi vào collection "tasks", App B dùng onSnapshot() để lắng nghe thời gian thực.
`}

## 3. CHECKLIST TRIỂN KHAI TỪNG BƯỚC
[ ] Bước 1: Sao lưu mã nguồn hoặc ghi lại ID của cả 2 dự án trên AI Studio.
[ ] Bước 2: Kiểm tra các thư viện trong package.json và hợp nhất dependencies nếu cần.
[ ] Bước 3: Áp dụng code mẫu theo phương pháp đã chọn.
[ ] Bước 4: Kiểm tra luồng truyền nhận dữ liệu giữa hai phần.
[ ] Bước 5: Chạy lệnh build hoặc compile_applet để xác nhận không có lỗi TypeScript.

---
*Blueprint được tạo bởi AI Studio Bridge & Integration Suite*`;
  };

  const handleCopyBlueprint = () => {
    navigator.clipboard.writeText(generateBlueprintText());
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([generateBlueprintText()], { type: 'text/markdown' });
    element.href = URL.createObjectURL(file);
    element.download = "ai_studio_integration_plan.md";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <section id="planner" className="py-16 border-t border-slate-800 bg-slate-900/50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/40 text-cyan-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Công cụ tạo kế hoạch tự động</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Tạo Bản Thiết Kế Ghép Nối (Blueprint)
          </h2>
          <p className="text-sm text-slate-400">
            Điền tên 2 phần của bạn để tạo ra kế hoạch kỹ thuật, sơ đồ kiến trúc và checklist chi tiết có thể copy hoặc tải về.
          </p>
        </div>

        {/* Inputs */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Tên hoặc mô tả Phần 1 (Ví dụ: Dashboard, Giao diện chính):
              </label>
              <input
                type="text"
                value={appAName}
                onChange={(e) => setAppAName(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Tên hoặc mô tả Phần 2 (Ví dụ: Tool AI, API xử lý):
              </label>
              <input
                type="text"
                value={appBName}
                onChange={(e) => setAppBName(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">
              Phương pháp ghép nối muốn áp dụng:
            </label>
            <select
              value={selectedMethod}
              onChange={(e) => setSelectedMethod(e.target.value as IntegrationType)}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
            >
              <option value="code_merge">1. Gộp mã nguồn thành 1 App (Khuyên dùng nhất - Nhanh, không CORS)</option>
              <option value="rest_api">2. Gọi REST API qua Cloud Run URL (Kiến trúc Microservices)</option>
              <option value="iframe_postmessage">3. Nhúng iframe & giao tiếp qua window.postMessage</option>
              <option value="prompt_chaining">4. Ghép chuỗi AI Pipeline (Cho 2 Prompt / System Instructions)</option>
              <option value="shared_database">5. Đồng bộ qua cơ sở dữ liệu chung (Firebase / Cloud SQL)</option>
            </select>
          </div>

          {/* Generated Blueprint View */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
                <FileCode className="w-3.5 h-3.5 text-cyan-400" />
                <span>Nội dung Blueprint & Prompt hướng dẫn cho AI Studio:</span>
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyBlueprint}
                  className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{isCopied ? 'Đã sao chép' : 'Sao chép văn bản'}</span>
                </button>

                <button
                  onClick={handleDownload}
                  className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Tải file .md</span>
                </button>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 font-mono text-[11px] text-slate-300 max-h-80 overflow-y-auto leading-relaxed">
              <pre className="whitespace-pre-wrap">{generateBlueprintText()}</pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
