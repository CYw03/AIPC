// /src/components/sales/SalesTools.tsx
export default function SalesTools() {
  const tools = [
    { icon: "📱", name: "电话拨打", action: "call" },
    { icon: "💬", name: "发送消息", action: "message" },
    { icon: "📧", name: "邮件模板", action: "email" },
    { icon: "📄", name: "生成报价", action: "quote" },
    { icon: "🎯", name: "销售话术", action: "script" },
    { icon: "📊", name: "竞品对比", action: "compare" },
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {tools.map((tool, index) => (
        <button
          key={index}
          className="flex flex-col items-center justify-center rounded-lg border p-3 hover:border-blue-300 hover:bg-blue-50"
          onClick={() => console.log(`点击了 ${tool.name}`)}
        >
          <span className="text-2xl">{tool.icon}</span>
          <span className="mt-1 text-xs font-medium">{tool.name}</span>
        </button>
      ))}
    </div>
  );
}