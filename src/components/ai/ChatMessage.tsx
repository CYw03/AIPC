export default function ChatMessage({
  role,
  text,
}: {
  role: "ai" | "user";
  text: string;
}) {
  const isAI = role === "ai";

  return (
    <div className={`flex ${isAI ? "justify-start" : "justify-end"}`}>
      <div
        className={`max-w-[70%] rounded-lg px-4 py-2 text-sm ${
          isAI
            ? "bg-gray-100 text-gray-800"
            : "bg-blue-600 text-white"
        }`}
      >
        {text}
      </div>
    </div>
  );
}
