// /src/components/dashboard/RecentConversations.tsx
export default function RecentConversations() {
  const conversations = [
    { id: 1, user: "张先生", needs: "AI开发 + 视频剪辑", time: "10分钟前", status: "已推荐" },
    { id: 2, user: "李女士", needs: "游戏 + 办公", time: "25分钟前", status: "咨询中" },
    { id: 3, user: "王同学", needs: "编程学习", time: "1小时前", status: "已推荐" },
    { id: 4, user: "赵工程师", needs: "3D建模渲染", time: "2小时前", status: "已到店" },
    { id: 5, user: "刘设计师", needs: "创意设计", time: "3小时前", status: "已成交" },
  ];
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "已推荐": return "bg-blue-100 text-blue-800";
      case "咨询中": return "bg-yellow-100 text-yellow-800";
      case "已到店": return "bg-purple-100 text-purple-800";
      case "已成交": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };
  
  return (
    <div className="space-y-3">
      {conversations.map((conv) => (
        <div key={conv.id} className="flex items-center justify-between rounded-lg border p-3 hover:bg-gray-50">
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium">{conv.user}</span>
                <span className="ml-2 text-sm text-gray-500">{conv.needs}</span>
              </div>
              <span className={`rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(conv.status)}`}>
                {conv.status}
              </span>
            </div>
            <div className="mt-1 text-sm text-gray-500">{conv.time}</div>
          </div>
        </div>
      ))}
    </div>
  );
}