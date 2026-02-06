// /src/components/sales/CustomerNotes.tsx
"use client";

import { useState } from "react";

interface CustomerNotesProps {
  customerId: number;
}

export default function CustomerNotes({ customerId }: CustomerNotesProps) {
  const [notes, setNotes] = useState([
    { id: 1, content: "客户对NPU算力很关注，需要准备性能演示", date: "今天 10:30", author: "张小凡" },
    { id: 2, content: "预算比较灵活，可以推荐高配版本", date: "昨天 16:20", author: "系统" },
    { id: 3, content: "提到需要做AI模型训练，对GPU有要求", date: "前天 11:45", author: "张小凡" },
  ]);
  const [newNote, setNewNote] = useState("");

  const addNote = () => {
    if (!newNote.trim()) return;
    const newNoteObj = {
      id: notes.length + 1,
      content: newNote,
      date: "刚刚",
      author: "张小凡",
    };
    setNotes([newNoteObj, ...notes]);
    setNewNote("");
  };

  return (
    <div>
      <div className="mb-4">
        <textarea
          className="w-full rounded-lg border p-3 text-sm focus:border-blue-500 focus:outline-none"
          rows={3}
          placeholder="记录销售笔记、客户偏好、跟进要点..."
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
        />
        <div className="mt-2 flex justify-end">
          <button
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
            onClick={addNote}
          >
            添加笔记
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {notes.map((note) => (
          <div key={note.id} className="rounded-lg border p-3">
            <div className="flex justify-between text-sm text-gray-500">
              <span>{note.author}</span>
              <span>{note.date}</span>
            </div>
            <p className="mt-2">{note.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}