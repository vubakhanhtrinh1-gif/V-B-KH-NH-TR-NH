import React from 'react';
import { Layers } from 'lucide-react';
import { IntegrationType } from '../types';

interface ComparisonMatrixProps {
  onSelectMethod: (methodId: IntegrationType) => void;
}

export const ComparisonMatrix: React.FC<ComparisonMatrixProps> = ({ onSelectMethod }) => {
  const comparisonData = [
    {
      id: 'code_merge' as IntegrationType,
      name: 'Gộp mã nguồn (Code Merge)',
      recommended: '★ Tối ưu nhất',
      latency: '< 1ms (Tức thì)',
      complexity: 'Dễ - Trung bình',
      corsIssue: 'Không (Cùng nguồn)',
      cloudCost: '1 Instance Cloud Run',
      idealFor: 'Gộp 2 applet thành 1 ứng dụng duy nhất, chia sẻ state mượt mà',
    },
    {
      id: 'rest_api' as IntegrationType,
      name: 'Gọi REST API (Cloud Run URL)',
      recommended: 'Microservices',
      latency: '50 - 200ms (Mạng)',
      complexity: 'Trung bình',
      corsIssue: 'Cần mở cors({ origin: "*" })',
      cloudCost: '2 Instances Cloud Run riêng',
      idealFor: '1 App làm giao diện, 1 App làm Backend xử lý dữ liệu nặng hoặc AI',
    },
    {
      id: 'iframe_postmessage' as IntegrationType,
      name: 'Iframe & postMessage',
      recommended: 'Nhúng nhanh',
      latency: '< 5ms (In-memory)',
      complexity: 'Dễ',
      corsIssue: 'Cần cấu hình CSP frame-ancestors',
      cloudCost: '2 Instances Cloud Run riêng',
      idealFor: 'Muốn giữ nguyên 100% giao diện App B mà không sửa code nội bộ',
    },
    {
      id: 'prompt_chaining' as IntegrationType,
      name: 'Chuỗi AI Pipeline (2 Prompts)',
      recommended: 'Dành cho AI Prompts',
      latency: '2 - 5s (Thời gian sinh AI)',
      complexity: 'Dễ',
      corsIssue: 'Không (Chạy qua GenAI SDK)',
      cloudCost: 'Tính theo Token Gemini API',
      idealFor: 'Tác vụ phức tạp cần chia làm 2 giai đoạn: Phân tích thô -> Viết hoàn chỉnh',
    },
    {
      id: 'shared_database' as IntegrationType,
      name: 'Cơ sở dữ liệu chung (Firebase/SQL)',
      recommended: 'Real-time Sync',
      latency: '10 - 50ms (Firestore listener)',
      complexity: 'Trung bình',
      corsIssue: 'Không (Kết nối qua SDK Firebase)',
      cloudCost: 'Tài nguyên Firebase / Cloud SQL',
      idealFor: '2 ứng dụng độc lập cần đồng bộ tài khoản, đơn hàng hoặc nhật ký thời gian thực',
    },
  ];

  return (
    <section id="comparison" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="space-y-3 mb-8">
        <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
          Đánh Giá Kỹ Thuật Đa Chiều
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Bảng So Sánh Các Phương Pháp Ghép Nối
        </h2>
        <p className="text-sm text-slate-400 max-w-2xl">
          So sánh chi tiết về hiệu năng, chi phí vận hành Cloud Run và mức độ phức tạp để bạn đưa ra quyết định chính xác.
        </p>
      </div>

      <div className="overflow-x-auto border border-slate-800 rounded-2xl bg-slate-900/60 shadow-xl">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-950/80 text-slate-300 font-semibold">
              <th className="py-4 px-4 sm:px-6">Phương Pháp</th>
              <th className="py-4 px-4">Đánh Giá</th>
              <th className="py-4 px-4 font-mono">Độ Trễ</th>
              <th className="py-4 px-4">Độ Phức Tạp</th>
              <th className="py-4 px-4">Bảo Mật & CORS</th>
              <th className="py-4 px-4">Tài Nguyên</th>
              <th className="py-4 px-4 text-right pr-6">Hành Động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-slate-300">
            {comparisonData.map((row) => (
              <tr 
                key={row.id} 
                className="hover:bg-slate-800/40 transition-colors group cursor-pointer"
                onClick={() => onSelectMethod(row.id)}
              >
                <td className="py-4 px-4 sm:px-6 font-medium text-white">
                  <div className="text-sm font-semibold group-hover:text-cyan-400 transition-colors">
                    {row.name}
                  </div>
                  <div className="text-[11px] text-slate-400 font-normal mt-0.5 max-w-xs">
                    {row.idealFor}
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className={`text-[11px] font-semibold ${
                    row.id === 'code_merge' ? 'text-cyan-400' : 'text-slate-400'
                  }`}>
                    {row.recommended}
                  </span>
                </td>
                <td className="py-4 px-4 font-mono tabular-nums text-slate-200">
                  {row.latency}
                </td>
                <td className="py-4 px-4 text-slate-300">
                  {row.complexity}
                </td>
                <td className="py-4 px-4 text-slate-400">
                  {row.corsIssue}
                </td>
                <td className="py-4 px-4 text-slate-400">
                  {row.cloudCost}
                </td>
                <td className="py-4 px-4 text-right pr-6">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectMethod(row.id);
                    }}
                    className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors underline underline-offset-4"
                  >
                    Xem code mẫu
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
