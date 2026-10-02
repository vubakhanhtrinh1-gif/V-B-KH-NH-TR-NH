import React, { useState } from 'react';
import { 
  Boxes, 
  Sparkles, 
  Network, 
  Send, 
  Play, 
  RefreshCw, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Radio
} from 'lucide-react';

export const InteractiveSandbox: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'postmessage' | 'pipeline' | 'rest_api'>('postmessage');

  // Sandbox 1: postMessage state
  const [appAMessage, setAppAMessage] = useState<string>('{"action": "SYNC_USER", "userId": "usr_9921", "role": "admin"}');
  const [postMessageLogs, setPostMessageLogs] = useState<Array<{ sender: 'A' | 'B'; text: string; time: string }>>([
    { sender: 'A', text: 'Khởi tạo kết nối window.addEventListener("message")', time: '10:00:00' },
    { sender: 'B', text: 'App B sẵn sàng lắng nghe trên port iframe', time: '10:00:01' }
  ]);
  const [isTransmitting, setIsTransmitting] = useState(false);

  const handleSendPostMessage = () => {
    if (!appAMessage.trim()) return;
    setIsTransmitting(true);
    const now = new Date().toLocaleTimeString();

    // Log from A
    setPostMessageLogs((prev) => [
      ...prev,
      { sender: 'A', text: `Gửi event COMMAND_FROM_APP_A: ${appAMessage}`, time: now }
    ]);

    // Simulated delay for B to receive and reply
    setTimeout(() => {
      const replyTime = new Date().toLocaleTimeString();
      setPostMessageLogs((prev) => [
        ...prev,
        { 
          sender: 'B', 
          text: `Nhận payload thành công! Phản hồi EVENT_FROM_APP_B: {"status": "ACK", "receivedAt": "${replyTime}"}`, 
          time: replyTime 
        }
      ]);
      setIsTransmitting(false);
    }, 600);
  };

  // Sandbox 2: Prompt Chaining State
  const [topicInput, setTopicInput] = useState<string>('Xây dựng hệ thống đề xuất bài viết thông minh theo sở thích đọc');
  const [isGenerating, setIsGenerating] = useState(false);
  const [stage1Output, setStage1Output] = useState<string | null>(null);
  const [stage2Output, setStage2Output] = useState<string | null>(null);

  const handleRunPipeline = () => {
    setIsGenerating(true);
    setStage1Output(null);
    setStage2Output(null);

    // Stage 1 simulation (Prompt 1)
    setTimeout(() => {
      setStage1Output(JSON.stringify({
        topic: topicInput,
        targetAudience: "Độc giả kỹ thuật & quản lý sản phẩm",
        extractedEntities: ["Content Recommendation", "Embedding Vector", "Cosine Similarity", "Realtime Signal"],
        tone: "Chuyên nghiệp, có cấu trúc chi tiết",
        estimatedComplexity: "Medium-High"
      }, null, 2));

      // Stage 2 simulation (Prompt 2 consumes Stage 1)
      setTimeout(() => {
        setStage2Output(
`# Kế Hoạch Triển Khai Hệ Thống Đề Xuất Thông Minh

Dựa trên phân tích từ Prompt 1:
1. Kiến trúc Embeddings:
   - Sử dụng model text-embedding-004 để vector hóa bài viết mới xuất bản.
   - Lưu trữ vector trong Cloud SQL với extension pgvector hoặc vector database.

2. Thuật toán gợi ý cá nhân hóa:
   - Tính toán Cosine Similarity giữa Vector bài đọc gần nhất của User và kho lưu trữ.
   - Thêm hệ số thời gian (Decay Factor) để ưu tiên tin tức mới trong 48 giờ.

3. Triển khai trong Google AI Studio:
   - Endpoint: /api/recommend
   - Tốc độ phản hồi trung bình: < 120ms`
        );
        setIsGenerating(false);
      }, 1000);
    }, 800);
  };

  // Sandbox 3: REST API state
  const [apiUrl, setApiUrl] = useState('https://ais-pre-app-b.run.app/api/process');
  const [apiPayload, setApiPayload] = useState('{\n  "query": "Kiểm tra kết nối giữa 2 AI Studio",\n  "appSource": "AI_STUDIO_APP_A"\n}');
  const [apiResponse, setApiResponse] = useState<string | null>(null);
  const [isCallingApi, setIsCallingApi] = useState(false);

  const handleCallApi = () => {
    setIsCallingApi(true);
    setTimeout(() => {
      setApiResponse(JSON.stringify({
        httpStatus: 200,
        ok: true,
        originAllowed: "*",
        serverTimestamp: new Date().toISOString(),
        data: {
          receivedSource: "AI_STUDIO_APP_A",
          executionResult: "Kết nối thành công qua REST API!",
          latency: "64ms"
        }
      }, null, 2));
      setIsCallingApi(false);
    }, 500);
  };

  return (
    <section id="sandboxes" className="py-16 border-t border-slate-800 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-800/40 text-indigo-300">
            <Radio className="w-3.5 h-3.5" />
            <span>Môi trường thử nghiệm tương tác</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Thử Nghiệm Trực Quan Cơ Chế Hoạt Động
          </h2>
          <p className="text-sm text-slate-400">
            Xem thực tế cách hai phần trao đổi thông tin, từ postMessage hai chiều, REST API, cho đến chuỗi Prompt Pipeline.
          </p>
        </div>

        {/* Sandbox Switcher */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl">
            <button
              onClick={() => setActiveTab('postmessage')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'postmessage'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Boxes className="w-3.5 h-3.5" />
              <span>Iframe postMessage</span>
            </button>

            <button
              onClick={() => setActiveTab('pipeline')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'pipeline'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Prompt Chaining (2 AI)</span>
            </button>

            <button
              onClick={() => setActiveTab('rest_api')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'rest_api'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Network className="w-3.5 h-3.5" />
              <span>Gọi REST API Giữa 2 App</span>
            </button>
          </div>
        </div>

        {/* TAB 1: Iframe postMessage Sandbox */}
        {activeTab === 'postmessage' && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Boxes className="w-5 h-5 text-indigo-400" />
                  <span>Mô phỏng: App A nhúng App B và truyền tin tức thì</span>
                </h3>
                <p className="text-xs text-slate-400">
                  postMessage truyền dữ liệu JSON trực tiếp trong bộ nhớ trình duyệt (Latency &lt; 5ms).
                </p>
              </div>

              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-1 rounded">
                ● Live 2-Way Link
              </span>
            </div>

            {/* Split Visual: App A and App B */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* App A Box */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
                    <span>Cửa sổ App A (Trang chính / Cha)</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">ais-app-a.run.app</span>
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-slate-400 block">Dữ liệu JSON gửi sang App B:</label>
                  <textarea
                    value={appAMessage}
                    onChange={(e) => setAppAMessage(e.target.value)}
                    rows={3}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-500 resize-none"
                  />
                </div>

                <button
                  onClick={handleSendPostMessage}
                  disabled={isTransmitting}
                  className="w-full py-2.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isTransmitting ? 'Đang truyền tin...' : 'Gửi sang App B (iframe.postMessage)'}</span>
                </button>
              </div>

              {/* App B Box */}
              <div className="bg-slate-950 border border-indigo-900/50 rounded-xl p-5 space-y-4 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400">
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 animate-pulse"></span>
                    <span>Khung nhìn App B (Được nhúng bên trong App A)</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">ais-app-b.run.app</span>
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-slate-400 block">Nhật ký nhận tin & phản hồi của App B:</label>
                  <div className="h-36 overflow-y-auto bg-slate-900 border border-slate-800 rounded-lg p-3 space-y-2 text-xs font-mono">
                    {postMessageLogs.map((log, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className={`px-1.5 py-0.5 rounded text-[10px] shrink-0 ${
                          log.sender === 'A' ? 'bg-cyan-950 text-cyan-400' : 'bg-indigo-950 text-indigo-400'
                        }`}>
                          {log.sender === 'A' ? 'Từ App A' : 'Tại App B'}
                        </span>
                        <span className="text-slate-300 leading-tight">{log.text}</span>
                        <span className="text-[10px] text-slate-500 ml-auto shrink-0">{log.time}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 flex items-center gap-1.5 pt-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Không cần reload lại trang, đồng bộ hoàn toàn theo thời gian thực.</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Prompt Chaining Sandbox */}
        {activeTab === 'pipeline' && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-400" />
                  <span>Mô phỏng: Nối 2 Prompt AI Gemini (Pipeline 2 Bước)</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Bước 1 trích xuất dữ liệu có cấu trúc JSON -&gt; Bước 2 nhận JSON để viết giải pháp chi tiết.
                </p>
              </div>

              <span className="text-[11px] font-mono text-purple-400 bg-purple-950/60 border border-purple-800/40 px-2 py-1 rounded">
                Gemini 2.5 Flash Pipeline
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs text-slate-400 block mb-1.5">
                  Nhập đề tài hoặc tác vụ đầu vào cho chuỗi 2 Prompt:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={topicInput}
                    onChange={(e) => setTopicInput(e.target.value)}
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                  <button
                    onClick={handleRunPipeline}
                    disabled={isGenerating}
                    className="px-5 py-2 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-lg transition-colors flex items-center gap-2 shrink-0 disabled:opacity-50"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>{isGenerating ? 'Đang chạy Pipeline...' : 'Chạy 2 Prompt'}</span>
                  </button>
                </div>
              </div>

              {/* 2 Stages Display */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-2">
                {/* Stage 1 */}
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-purple-400">
                      Prompt 1: Phân tích & Trích xuất JSON
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">Mô hình: Flash</span>
                  </div>

                  <div className="h-52 overflow-y-auto bg-slate-900/90 border border-slate-800/80 rounded-lg p-3 font-mono text-[11px] text-slate-300">
                    {stage1Output ? (
                      <pre className="whitespace-pre-wrap">{stage1Output}</pre>
                    ) : (
                      <div className="h-full flex items-center justify-center text-slate-500 text-xs">
                        {isGenerating ? 'Đang phân tích và tạo cấu trúc...' : 'Chờ chạy pipeline...'}
                      </div>
                    )}
                  </div>
                </div>

                {/* Stage 2 */}
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-cyan-400">
                      Prompt 2: Tạo giải pháp dựa trên kết quả Bước 1
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">Đầu ra hoàn thiện</span>
                  </div>

                  <div className="h-52 overflow-y-auto bg-slate-900/90 border border-slate-800/80 rounded-lg p-3 text-[11px] text-slate-300">
                    {stage2Output ? (
                      <pre className="whitespace-pre-wrap font-sans leading-relaxed">{stage2Output}</pre>
                    ) : (
                      <div className="h-full flex items-center justify-center text-slate-500 text-xs">
                        {isGenerating ? 'Bước 2 đang xử lý dựa trên JSON bước 1...' : 'Chờ hoàn thành bước 1...'}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: REST API Sandbox */}
        {activeTab === 'rest_api' && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Network className="w-5 h-5 text-blue-400" />
                  <span>Mô phỏng: App A gửi HTTP POST sang URL của App B</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Mỗi app trong AI Studio có một URL Cloud Run riêng (`APP_URL`). App A có thể gọi trực tiếp sang App B.
                </p>
              </div>

              <span className="text-[11px] font-mono text-blue-400 bg-blue-950/60 border border-blue-800/40 px-2 py-1 rounded">
                HTTP / Cloud Run
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Request configuration */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4">
                <div className="space-y-1">
                  <label className="text-xs text-slate-400 block">URL Endpoint của App B:</label>
                  <input
                    type="text"
                    value={apiUrl}
                    onChange={(e) => setApiUrl(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-cyan-300 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-slate-400 block">JSON Payload (Body):</label>
                  <textarea
                    value={apiPayload}
                    onChange={(e) => setApiPayload(e.target.value)}
                    rows={4}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs font-mono text-slate-200 focus:outline-none focus:border-blue-500 resize-none"
                  />
                </div>

                <button
                  onClick={handleCallApi}
                  disabled={isCallingApi}
                  className="w-full py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Network className="w-3.5 h-3.5" />
                  <span>{isCallingApi ? 'Đang gửi Request...' : 'Gửi HTTP POST (fetch)'}</span>
                </button>
              </div>

              {/* Response Inspector */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-300">Phản hồi từ Server App B:</span>
                  {apiResponse && (
                    <span className="text-[10px] text-emerald-400 font-mono">200 OK (64ms)</span>
                  )}
                </div>

                <div className="h-52 overflow-y-auto bg-slate-900 border border-slate-800 rounded-lg p-3 font-mono text-xs text-emerald-400">
                  {apiResponse ? (
                    <pre className="whitespace-pre-wrap">{apiResponse}</pre>
                  ) : (
                    <div className="h-full flex items-center justify-center text-slate-500 text-xs">
                      Nhấn "Gửi HTTP POST" để xem phản hồi...
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
