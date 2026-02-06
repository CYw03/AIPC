// /src/app/dashboard/page.tsx
import MetricCard from "@/components/MetricCard";
import ConversionChart from "@/components/dashboard/ConversionChart";
import PopularModels from "@/components/dashboard/PopularModels";
import RecentConversations from "@/components/dashboard/RecentConversations";

export default function DashboardPage() {
  return (
    <div className="space-y-6 p-6">
      {/* 标题和统计 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">AIPC 智能助手数据看板</h1>
          <p className="text-gray-500">实时监控AI助手的推荐效果和用户行为</p>
        </div>
        <div className="text-sm text-gray-500">
          最后更新：今天 14:30
        </div>
      </div>

      {/* 关键指标卡片 */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard 
          title="AI 推荐次数" 
          value="1,024" 
          change="+12.5%"
          icon="🚀"
          description="本月累计推荐"
        />
        <MetricCard 
          title="咨询转化率" 
          value="42%" 
          change="+3.2%"
          icon="📈"
          description="咨询到意向转化"
        />
        <MetricCard 
          title="到店率" 
          value="28%" 
          change="+1.8%"
          icon="🏪"
          description="意向用户到店体验"
        />
        <MetricCard 
          title="模拟成交率" 
          value="18%" 
          change="+2.1%"
          icon="💰"
          description="模拟成交转化"
        />
      </div>

      {/* 第二行：图表和热门型号 */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* 转化率趋势图 */}
        <div className="rounded-xl border bg-white p-4 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold">转化率趋势</h2>
          <div className="h-64">
            <ConversionChart />
          </div>
        </div>

        {/* 热门推荐型号 */}
        <div className="rounded-xl border bg-white p-4 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold">热门推荐型号 Top 5</h2>
          <PopularModels />
        </div>
      </div>

      {/* 第三行：最近对话和用户画像 */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* 最近对话记录 */}
        <div className="rounded-xl border bg-white p-4 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">最近对话记录</h2>
            <button className="text-sm text-blue-600 hover:text-blue-800">
              查看全部 →
            </button>
          </div>
          <RecentConversations />
        </div>

        {/* 用户画像分布 */}
        <div className="rounded-xl border bg-white p-4 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold">用户画像分布</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="flex items-center">
                <div className="mr-2 h-3 w-3 rounded-full bg-blue-500"></div>
                <span>AI开发者</span>
              </span>
              <span className="font-medium">38%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center">
                <div className="mr-2 h-3 w-3 rounded-full bg-green-500"></div>
                <span>视频创作者</span>
              </span>
              <span className="font-medium">24%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center">
                <div className="mr-2 h-3 w-3 rounded-full bg-purple-500"></div>
                <span>游戏玩家</span>
              </span>
              <span className="font-medium">18%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center">
                <div className="mr-2 h-3 w-3 rounded-full bg-yellow-500"></div>
                <span>商务办公</span>
              </span>
              <span className="font-medium">15%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center">
                <div className="mr-2 h-3 w-3 rounded-full bg-gray-500"></div>
                <span>其他</span>
              </span>
              <span className="font-medium">5%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}