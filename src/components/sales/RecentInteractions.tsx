// /src/components/sales/RecentInteractions.tsx
interface RecentInteractionsProps {
  customerId: number;
}

export default function RecentInteractions({ customerId }: RecentInteractionsProps) {
  const interactions = [
    { id: 1, type: "在线咨询", content: "咨询了关于NPU算力的问题", time: "今天 10:30", duration: "15分钟" },
    { id: 2, type: "电话回访", content: "确认了预算范围和需求细节", time: "昨天 16:45", duration: "8分钟" },
    { id: 3, type: "AI助手", content: "通过AI助手完成了需求收集", time: "前天 11:10", duration: "22分钟" },
    { id: 4, type: "产品演示", content: "远程演示了AI开发环境配置", time: "3天前", duration: "30分钟" },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "在线咨询": return "bg-blue-100 text-blue-800";
      case "电话回访": return "bg-green-100 text-green-800";
      case "AI助手": return "bg-purple-100 text-purple-800";
      case "产品演示": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-4">
      {interactions.map((interaction) => (
        <div key={interaction.id} className="rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <span className={`rounded-full px-3 py-1 text-xs font-medium ${getTypeColor(interaction.type)}`}>
              {interaction.type}
            </span>
            <span className="text-sm text-gray-500">{interaction.time}</span>
          </div>
          <p className="mt-2">{interaction.content}</p>
          <div className="mt-3 flex items-center justify-between text-sm text-gray-500">
            <span>持续时间：{interaction.duration}</span>
            <button className="text-blue-600 hover:text-blue-800">
              查看详情
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}