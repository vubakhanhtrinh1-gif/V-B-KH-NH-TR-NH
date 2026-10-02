import { MethodInfo } from '../types';

export const INTEGRATION_METHODS: MethodInfo[] = [
  {
    id: 'code_merge',
    title: 'Gộp mã nguồn thành một ứng dụng (Khuyên dùng nhất)',
    tagline: 'Chuyển đổi 2 dự án AI Studio thành 1 codebase duy nhất với các module riêng biệt',
    badge: 'Tối ưu & Khuyên Dùng',
    recommendedFor: '2 Web Applet trong AI Studio Build cần gộp thành 1 sản phẩm hoàn chỉnh',
    difficulty: 'Dễ',
    speed: 'Tức thì (<1ms)',
    bestCase: 'Khi bạn muốn người dùng truy cập vào 1 liên kết duy nhất, không lo lỗi mạng, không lo CORS, và quản lý code tập trung.',
    pros: [
      'Hiệu năng cao nhất: Không phát sinh độ trễ mạng (Network latency)',
      'Không bị chặn CORS hoặc chính sách bảo mật trình duyệt',
      'Chỉ cần duy trì 1 tên miền / 1 dự án Cloud Run trong AI Studio',
      'Dễ dàng chia sẻ State (React Context, Zustand, Props) giữa 2 phần'
    ],
    cons: [
      'Cần giải quyết xung đột thư viện nếu 2 app dùng các phiên bản package khác nhau',
      'Cần tổ chức lại cấu trúc thư mục rõ ràng'
    ],
    steps: [
      {
        title: 'Bước 1: Tải về mã nguồn hoặc sao chép component từ App B',
        description: 'Mở App B trên AI Studio, sao chép các file trong thư mục `src/` (hoặc tải zip nếu có). Đặt toàn bộ tính năng của App B vào một thư mục riêng trong App A, ví dụ `/src/features/partB/` hoặc `/src/components/partB/`.',
        language: 'bash',
        codeSnippet: `// Cấu trúc thư mục đề xuất sau khi gộp vào App A:
src/
├── features/
│   ├── partA_dashboard/     // Tính năng từ AI Studio 1
│   │   ├── Dashboard.tsx
│   │   └── widgets/
│   └── partB_ai_assistant/  // Tính năng từ AI Studio 2
│       ├── AssistantView.tsx
│       └── chatService.ts
├── App.tsx                  // Component chính điều hướng 2 phần
└── main.tsx`
      },
      {
        title: 'Bước 2: Hợp nhất dependencies trong package.json',
        description: 'Kiểm tra `package.json` của cả 2 app. Nếu App B có dùng thêm thư viện (ví dụ lucide-react, motion, axios...), hãy thêm vào `package.json` của App A và cài đặt.',
        language: 'json',
        codeSnippet: `// Ghép dependencies từ 2 package.json:
{
  "dependencies": {
    "@google/genai": "^2.4.0",
    "lucide-react": "^0.546.0",
    "motion": "^12.23.24",
    "react": "^19.0.1",
    "react-dom": "^19.0.1"
  }
}`
      },
      {
        title: 'Bước 3: Tạo giao diện điều hướng (Tabs hoặc Sidebar Navigation)',
        description: 'Tại `src/App.tsx`, tạo thanh chuyển đổi (Tabs/Sidebar) để người dùng có thể linh hoạt chuyển qua lại hoặc sử dụng đồng thời 2 tính năng.',
        language: 'tsx',
        codeSnippet: `import { useState } from 'react';
import PartAView from './features/partA_dashboard/Dashboard';
import PartBView from './features/partB_ai_assistant/AssistantView';

export default function App() {
  const [activeTab, setActiveTab] = useState<'partA' | 'partB'>('partA');
  // Dữ liệu có thể chia sẻ trực tiếp giữa 2 phần!
  const [sharedData, setSharedData] = useState<string>('');

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-white">
      <nav className="flex border-b border-slate-800 p-4 gap-4">
        <button 
          onClick={() => setActiveTab('partA')}
          className={activeTab === 'partA' ? 'font-bold text-blue-400' : 'text-slate-400'}
        >
          Phần 1: Dashboard
        </button>
        <button 
          onClick={() => setActiveTab('partB')}
          className={activeTab === 'partB' ? 'font-bold text-blue-400' : 'text-slate-400'}
        >
          Phần 2: Trợ lý AI
        </button>
      </nav>

      <main className="p-6 flex-1">
        {activeTab === 'partA' && <PartAView data={sharedData} onUpdate={setSharedData} />}
        {activeTab === 'partB' && <PartBView sharedInput={sharedData} />}
      </main>
    </div>
  );
}`
      }
    ]
  },
  {
    id: 'rest_api',
    title: 'Kết nối qua REST API / Cloud Run URL',
    tagline: 'Một ứng dụng đóng vai trò Frontend, ứng dụng còn lại đóng vai trò Backend API Service',
    badge: 'Kiến trúc Microservices',
    recommendedFor: 'Khi App B có backend Express xử lý nặng, hoặc bạn muốn giữ 2 app độc lập',
    difficulty: 'Trung bình',
    speed: 'Nhanh (50-200ms)',
    bestCase: 'Khi bạn muốn giữ 2 dự án chạy trên 2 URL riêng biệt nhưng App 1 cần gửi dữ liệu sang App 2 xử lý và nhận kết quả.',
    pros: [
      'Tách biệt hoàn toàn: Code của App A và App B không bị phụ thuộc vào nhau',
      'Có thể nâng cấp hoặc sửa lỗi App B mà không sợ làm sập giao diện App A',
      'Có thể tái sử dụng App B làm API chung cho nhiều ứng dụng khác'
    ],
    cons: [
      'Phải cấu hình CORS (`cors()`) ở App B để App A được phép gọi sang',
      'Độ trễ mạng phụ thuộc vào khoảng cách Cloud Run instance'
    ],
    steps: [
      {
        title: 'Bước 1: Mở API endpoint ở App B (Backend)',
        description: 'Tại `server.ts` của App B, cài đặt middleware `cors` và mở route `/api/process` nhận request từ App A.',
        language: 'typescript',
        codeSnippet: `// File: server.ts ở App B (Nhận request)
import express from 'express';
import cors from 'cors';

const app = express();
// Cho phép App A gọi sang (hoặc chỉ định rõ URL App A)
app.use(cors({ origin: '*' }));
app.use(express.json());

app.post('/api/process', async (req, res) => {
  const { inputPrompt, parameters } = req.body;
  
  // Xử lý logic tại App B (Ví dụ gọi Gemini AI hoặc tính toán)
  const result = {
    status: 'success',
    timestamp: new Date().toISOString(),
    processedOutput: \`Đã xử lý thành công: \${inputPrompt}\`,
  };

  res.json(result);
});

app.listen(3000, () => console.log('App B API running on port 3000'));`
      },
      {
        title: 'Bước 2: Lấy URL công khai của App B',
        description: 'Trong AI Studio của App B, URL ứng dụng có dạng: `https://ais-xxx.run.app`. Copy URL này để đưa vào biến môi trường của App A.',
        language: 'bash',
        codeSnippet: `# Thêm vào file .env của App A:
VITE_APP_B_API_URL="https://ais-pre-your-app-b-id.run.app"`
      },
      {
        title: 'Bước 3: Gửi dữ liệu từ App A sang App B bằng fetch()',
        description: 'Tại App A, gọi HTTP POST sang endpoint của App B để trao đổi dữ liệu.',
        language: 'typescript',
        codeSnippet: `// Tại App A (Frontend):
async function sendToAppB(dataToSend: { prompt: string }) {
  const APP_B_URL = import.meta.env.VITE_APP_B_API_URL || 'https://ais-app-b-url.run.app';
  
  try {
    const response = await fetch(\`\${APP_B_URL}/api/process\`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputPrompt: dataToSend.prompt,
        parameters: { version: '2.0' }
      }),
    });

    if (!response.ok) throw new Error('Gọi App B thất bại');
    const data = await response.json();
    console.log('Kết quả từ App B:', data);
    return data;
  } catch (error) {
    console.error('Lỗi kết nối App B:', error);
  }
}`
      }
    ]
  },
  {
    id: 'iframe_postmessage',
    title: 'Nhúng giao diện qua iframe và truyền tin bằng postMessage',
    tagline: 'Nhúng nguyên vẹn màn hình App B vào trong App A và giao tiếp 2 chiều',
    badge: 'Tích hợp Giao diện Tức thì',
    recommendedFor: 'Khi bạn không muốn sửa code App B nhưng muốn hiển thị nó trực tiếp trong App A',
    difficulty: 'Dễ',
    speed: 'Tức thì (<5ms)',
    bestCase: 'Khi 2 app đã hoàn chỉnh giao diện riêng và bạn muốn tạo một cổng điều khiển trung tâm (Portal/Dashboard) nhúng app kia.',
    pros: [
      'Không cần viết lại giao diện hoặc cấu trúc lại component',
      'Độ trễ truyền tin giữa 2 cửa sổ cực thấp (< 5ms)',
      'Bảo mật theo nguồn (Origin verification) ngăn chặn tấn công giả mạo'
    ],
    cons: [
      'Cần đảm bảo App B không chặn frame (`X-Frame-Options` hoặc CSP `frame-ancestors`)',
      'Trải nghiệm trên màn hình điện thoại nhỏ có thể bị cuộn 2 lớp nếu không canh chỉnh CSS'
    ],
    steps: [
      {
        title: 'Bước 1: Nhúng iframe App B vào trong App A',
        description: 'Tạo thẻ `<iframe>` trong App A và lưu tham chiếu `ref` để gửi sự kiện.',
        language: 'tsx',
        codeSnippet: `// Tại App A (Parent Container):
import { useRef, useEffect, useState } from 'react';

export function EmbeddedAppB() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [messagesFromB, setMessagesFromB] = useState<any[]>([]);

  // Lắng nghe tin nhắn từ App B gửi lên
  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      // Bảo mật: Kiểm tra domain của App B
      if (!event.origin.includes('run.app') && !event.origin.includes('localhost')) return;
      
      if (event.data?.type === 'EVENT_FROM_APP_B') {
        console.log('App A nhận được từ App B:', event.data.payload);
        setMessagesFromB(prev => [...prev, event.data.payload]);
      }
    }

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Gửi lệnh xuống App B
  const sendCommandToB = (action: string) => {
    iframeRef.current?.contentWindow?.postMessage({
      type: 'COMMAND_FROM_APP_A',
      payload: { action, time: Date.now() }
    }, '*');
  };

  return (
    <div className="w-full h-[600px] border rounded-lg overflow-hidden">
      <iframe 
        ref={iframeRef}
        src="https://ais-your-app-b.run.app" 
        className="w-full h-full border-none"
        title="App B Iframe"
      />
    </div>
  );
}`
      },
      {
        title: 'Bước 2: App B lắng nghe và gửi phản hồi lên App A',
        description: 'Tại App B, thêm sự kiện `window.addEventListener("message")` để nhận lệnh và `window.parent.postMessage()` để báo cáo trạng thái.',
        language: 'typescript',
        codeSnippet: `// Tại App B (Child Window):
useEffect(() => {
  function handleParentMessage(event: MessageEvent) {
    if (event.data?.type === 'COMMAND_FROM_APP_A') {
      console.log('App B nhận lệnh:', event.data.payload);
      
      // Xử lý và gửi phản hồi lên App A
      window.parent.postMessage({
        type: 'EVENT_FROM_APP_B',
        payload: { status: 'DONE', result: 'Dữ liệu đã xử lý xong' }
      }, '*');
    }
  }

  window.addEventListener('message', handleParentMessage);
  return () => window.removeEventListener('message', handleParentMessage);
}, []);`
      }
    ]
  },
  {
    id: 'prompt_chaining',
    title: 'Ghép chuỗi AI (Prompt Chaining / Pipeline)',
    tagline: 'Kết nối nếu "2 phần" của bạn là 2 Prompt / System Instruction khác nhau',
    badge: 'Dành cho AI Prompts',
    recommendedFor: 'Trường hợp bạn có 2 Prompt AI riêng biệt trong Google AI Studio cần chạy nối tiếp',
    difficulty: 'Dễ',
    speed: '2-5s (Thời gian sinh AI)',
    bestCase: 'Khi tác vụ quá phức tạp cho 1 prompt đơn lẻ: Prompt 1 phân loại / trích xuất cấu trúc, Prompt 2 nhận kết quả để sinh nội dung chuyên sâu.',
    pros: [
      'Chất lượng output cao hơn gấp 3 lần so với ép 1 prompt làm quá nhiều việc',
      'Dễ kiểm tra lỗi (debugging) từng mắt xích trong chuỗi',
      'Có thể dùng 2 model khác nhau (ví dụ: gemini-2.5-flash ở bước 1, gemini-2.5-pro ở bước 2)'
    ],
    cons: [
      'Thời gian phản hồi là tổng thời gian của cả 2 lần gọi AI'
    ],
    steps: [
      {
        title: 'Bước 1: Định nghĩa 2 Prompt và Output Schema chuẩn',
        description: 'Tạo cấu trúc JSON schema cho Prompt 1 để kết quả đầu ra luôn chuẩn chỉ, giúp Prompt 2 đọc hiểu 100% không bị lệch.',
        language: 'typescript',
        codeSnippet: `import { GoogleGenAI, Type } from '@google/genai';

const ai = new GoogleGenAI();

// Prompt 1: Phân tích & Trích xuất ý chính
const PROMPT_1_SYSTEM = \`Bạn là chuyên gia phân tích dữ liệu. Hãy phân tích yêu cầu của người dùng và trích xuất:
1. Ý tưởng cốt lõi
2. Các từ khóa quan trọng
3. Tông giọng phù hợp (Formal/Creative/Technical)\`;

// Prompt 2: Soạn thảo bài bản dựa trên phân tích ở Bước 1
const PROMPT_2_SYSTEM = \`Bạn là chuyên gia sáng tạo nội dung. Dựa trên bản phân tích được cung cấp, hãy viết một bài thuyết trình hoàn chỉnh.\`;`
      },
      {
        title: 'Bước 2: Viết hàm thực thi chuỗi Pipeline (Sequential Execution)',
        description: 'Truyền output của Bước 1 làm input cho Bước 2 qua SDK @google/genai.',
        language: 'typescript',
        codeSnippet: `async function runTwoStagePipeline(userInput: string) {
  // Giai đoạn 1: Chạy Prompt 1 với gemini-2.5-flash (tốc độ cao)
  const step1Response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: userInput,
    config: {
      systemInstruction: PROMPT_1_SYSTEM,
      responseMimeType: 'application/json',
    }
  });

  const step1Analysis = step1Response.text;
  console.log('Kết quả Bước 1 (JSON):', step1Analysis);

  // Giai đoạn 2: Lấy kết quả Bước 1 đưa vào Prompt 2
  const step2Response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: \`Dưới đây là bản phân tích từ bước 1:\n\${step1Analysis}\n\nHãy tạo bài thuyết trình hoàn chỉnh:\`,
    config: {
      systemInstruction: PROMPT_2_SYSTEM,
    }
  });

  return {
    rawAnalysis: step1Analysis,
    finalOutput: step2Response.text
  };
}`
      }
    ]
  },
  {
    id: 'shared_database',
    title: 'Đồng bộ qua Cơ sở dữ liệu dùng chung (Shared Database)',
    tagline: 'Cả 2 ứng dụng cùng kết nối vào một Firebase Firestore hoặc Cloud SQL',
    badge: 'Real-time State Sync',
    recommendedFor: '2 ứng dụng chạy độc lập nhưng cần cập nhật dữ liệu chung thời gian thực',
    difficulty: 'Trung bình',
    speed: 'Thời gian thực (10-50ms)',
    bestCase: 'Khi App A tạo tác vụ / đơn hàng, App B là bảng điều khiển tiếp nhận và xử lý.',
    pros: [
      'Đồng bộ dữ liệu thời gian thực (Real-time snapshot listener)',
      'Không cần 2 app phải online cùng lúc (Asynchronous sync)',
      'Lịch sử dữ liệu được lưu trữ vĩnh viễn'
    ],
    cons: [
      'Cần thiết lập Firebase Project hoặc Cloud SQL instance'
    ],
    steps: [
      {
        title: 'Bước 1: Sử dụng chung cấu hình Firebase giữa 2 ứng dụng',
        description: 'Sao chép thông số cấu hình Firebase (`firebaseConfig`) từ App A sang App B.',
        language: 'typescript',
        codeSnippet: `// File: src/firebase.ts (Sử dụng giống hệt nhau ở cả 2 App)
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, onSnapshot } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);`
      },
      {
        title: 'Bước 2: App A ghi dữ liệu - App B lắng nghe tức thì',
        description: 'App A cập nhật tài liệu trong collection `tasks`, App B tự động kích hoạt callback cập nhật UI.',
        language: 'typescript',
        codeSnippet: `// Tại App A: Ghi dữ liệu
import { db } from './firebase';
import { doc, setDoc } from 'firebase/firestore';

await setDoc(doc(db, 'shared_channel', 'current_task'), {
  command: 'GENERATE_REPORT',
  payload: { title: 'Báo cáo Q3', targetUser: 'Admin' },
  updatedAt: new Date().toISOString()
});

// Tại App B: Lắng nghe thời gian thực
import { db } from './firebase';
import { doc, onSnapshot } from 'firebase/firestore';

onSnapshot(doc(db, 'shared_channel', 'current_task'), (docSnap) => {
  if (docSnap.exists()) {
    console.log('App B nhận dữ liệu mới:', docSnap.data());
    // Tự động kích hoạt xử lý tại App B!
  }
});`
      }
    ]
  }
];
