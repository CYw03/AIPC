"use client";

import { useState } from "react";
import { chatWithAI } from "@/services/api";

export default function ChatBox({
  onResult,
}: {
  onResult: (data: any) => void;
}) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const send = async () => {
    setLoading(true);
    const res = await chatWithAI(input);
    onResult(res);
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h2 className="font-bold mb-2">AI 购机助手</h2>
      <textarea
        className="w-full border rounded p-2"
        placeholder="例如：我主要做 AI 训练，预算 1 万 5"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        onClick={send}
        disabled={loading}
        className="mt-2 bg-black text-white px-4 py-2 rounded"
      >
        {loading ? "分析中..." : "获取推荐"}
      </button>
    </div>
  );
}
