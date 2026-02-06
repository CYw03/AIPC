// /src/components/ai/AssistantLayout.tsx - 更新版
interface AssistantLayoutProps {
  left: React.ReactNode;
  center: React.ReactNode;
  right: React.ReactNode;
}

export default function AssistantLayout({ left, center, right }: AssistantLayoutProps) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* 左侧：步骤面板 */}
      <div className="lg:col-span-1">
        {left}
      </div>
      
      {/* 中间：聊天面板 */}
      <div className="lg:col-span-1">
        {center}
      </div>
      
      {/* 右侧：洞察和推荐 */}
      <div className="lg:col-span-1">
        {right}
      </div>
    </div>
  );
}