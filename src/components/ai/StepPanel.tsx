// /src/components/ai/StepPanel.tsx - 修复排版版
export default function StepPanel({ completed = [] }: { completed?: string[] }) {
  const steps = [
    { id: "scene", label: "使用场景", description: "AI开发/视频剪辑/游戏等", icon: "🎯" },
    { id: "budget", label: "预算区间", description: "5k-8k/8k-12k/12k+", icon: "💰" },
    { id: "preference", label: "使用偏好", description: "便携性/性能等", icon: "⚙️" },
    { id: "recommendation", label: "推荐结果", description: "AI智能匹配", icon: "🤖" },
  ];

  return (
    <div className="h-full p-6">
      <div className="mb-6 flex items-center space-x-3">
        <div className="rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 p-2">
          <span className="text-xl text-white">📋</span>
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900">购机向导</h3>
          <p className="text-sm text-gray-500">4步完成智能推荐</p>
        </div>
      </div>
      
      <div className="space-y-6">
        {steps.map((step, index) => {
          const isCompleted = completed.includes(step.id);
          const isCurrent = index === completed.length;
          
          return (
            <div key={step.id} className="relative">
              {/* 连接线（除了最后一个） */}
              {index < steps.length - 1 && (
                <div className="absolute left-5 top-10 h-full w-0.5 -translate-x-1/2">
                  <div className={`h-full w-full ${
                    isCompleted || isCurrent 
                      ? 'bg-gradient-to-b from-blue-500 to-purple-500' 
                      : 'bg-gray-200'
                  }`}></div>
                </div>
              )}
              
              <div className="flex items-start">
                {/* 步骤图标 */}
                <div className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                  isCompleted 
                    ? 'border-white bg-gradient-to-r from-green-500 to-emerald-500 shadow-md' 
                    : isCurrent
                    ? 'border-blue-500 bg-white shadow-md'
                    : 'border-gray-300 bg-white'
                }`}>
                  {isCompleted ? (
                    <span className="text-lg text-white">✓</span>
                  ) : (
                    <span className={`text-lg ${
                      isCurrent ? 'text-blue-600' : 'text-gray-400'
                    }`}>
                      {step.icon}
                    </span>
                  )}
                  {/* 步骤编号 */}
                  <div className={`absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold ${
                    isCompleted 
                      ? 'bg-green-500 text-white' 
                      : isCurrent
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-300 text-gray-600'
                  }`}>
                    {index + 1}
                  </div>
                </div>
                
                {/* 步骤内容 */}
                <div className="ml-4 flex-1 pt-1">
                  <div className="flex items-center justify-between">
                    <h4 className={`font-medium ${
                      isCompleted 
                        ? 'text-green-700' 
                        : isCurrent
                        ? 'text-blue-700'
                        : 'text-gray-500'
                    }`}>
                      {step.label}
                    </h4>
                    {isCompleted && (
                      <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                        已完成
                      </span>
                    )}
                    {isCurrent && (
                      <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
                        当前步骤
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-gray-600">{step.description}</p>
                  
                  {/* 步骤详情（根据完成状态显示） */}
                  {isCompleted && step.id === "scene" && (
                    <div className="mt-2 rounded-lg bg-green-50 p-2 text-xs text-green-800">
                      ✅ 已收集使用场景信息
                    </div>
                  )}
                  {isCompleted && step.id === "budget" && (
                    <div className="mt-2 rounded-lg bg-green-50 p-2 text-xs text-green-800">
                      ✅ 预算范围已确认
                    </div>
                  )}
                  {isCompleted && step.id === "preference" && (
                    <div className="mt-2 rounded-lg bg-green-50 p-2 text-xs text-green-800">
                      ✅ 使用偏好已记录
                    </div>
                  )}
                  {isCurrent && (
                    <div className="mt-2 animate-pulse rounded-lg bg-blue-50 p-2 text-xs text-blue-800">
                      🔄 正在等待输入...
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* 底部总结 */}
      <div className="mt-8 rounded-xl bg-gradient-to-r from-gray-50 to-blue-50/30 p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-medium text-gray-700">完成进度</div>
            <div className="text-2xl font-bold text-gray-900">
              {Math.round((completed.length / 3) * 100)}%
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600">
              {completed.length}/3 步骤
            </div>
            <div className="text-xs text-gray-500">
              {completed.length === 3 ? '准备生成推荐' : '继续与AI对话'}
            </div>
          </div>
        </div>
        <div className="mt-3 h-2 w-full rounded-full bg-gray-200">
          <div 
            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
            style={{ width: `${(completed.length / 3) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}