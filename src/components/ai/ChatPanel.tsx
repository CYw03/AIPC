// ChatPanel.tsx - 大幅简化
"use client";

import { useState } from "react";
import ChatMessage from "./ChatMessage";

type Message = {
  role: "ai" | "user";
  text: string;
};

export default function ChatPanel({
  onProfileUpdate,
}: {
  onProfileUpdate?: (profile: any) => void;
}) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      text: "你好！我是联想 AIPC AI 购机助手，可以帮你推荐最适合你的设备 😊\n\n请先说说你的主要使用场景（比如：AI开发、视频剪辑、办公、游戏等）。",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [context, setContext] = useState({
    step: 1,
    profile: {},
    history: []
  });

  const sendMessage = async (text: string) => {
    // 添加用户消息
    setMessages((prev) => [...prev, { role: "user", text }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          context
        })
      });

      const data = await res.json();

      // 添加AI回复
      setMessages((prev) => [...prev, { role: "ai", text: data.reply }]);
      
      // 更新上下文
      setContext(prev => ({
        ...prev,
        step: data.step || prev.step,
        profile: data.profile || prev.profile,
        history: data.history || prev.history
      }));

      // 通知父组件
      onProfileUpdate?.(data.profile);

    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { 
        role: "ai", 
        text: "抱歉，暂时无法处理您的请求，请稍后再试。" 
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-full flex-col">
      {/* 对话区域 */}
      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {messages.map((msg, idx) => (
          <ChatMessage key={idx} role={msg.role} text={msg.text} />
        ))}
        {loading && (
          <div className="flex items-center space-x-2 text-gray-500 italic">
            <span className="animate-pulse">●</span>
            <span>AI 正在思考...</span>
          </div>
        )}
      </div>

      {/* 输入区域 */}
      <div className="border-t p-4">
        <div className="flex gap-2">
          <input
            className="flex-1 rounded border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="输入你的需求..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && input.trim() && !loading && sendMessage(input.trim())}
            disabled={loading}
          />
          <button
            className="rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700 disabled:opacity-50"
            onClick={() => input.trim() && !loading && sendMessage(input.trim())}
            disabled={!input.trim() || loading}
          >
            发送
          </button>
        </div>
      </div>
    </div>
  );
}