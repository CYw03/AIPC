// /src/components/dashboard/PopularModels.tsx
export default function PopularModels() {
  const models = [
    { name: "ThinkPad X1 Carbon AI", count: 243, change: "+15%" },
    { name: "Yoga 9i AI", count: 198, change: "+8%" },
    { name: "小新 Pro 14 AI", count: 176, change: "+22%" },
    { name: "ThinkBook 16p AI", count: 154, change: "+5%" },
    { name: "拯救者 Y9000X AI", count: 132, change: "+18%" },
  ];
  
  const maxCount = Math.max(...models.map(m => m.count));
  
  return (
    <div className="space-y-4">
      {models.map((model, index) => (
        <div key={index} className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-700">{model.name}</span>
              <span className="text-sm text-gray-500">{model.count}次</span>
            </div>
            <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-gray-200">
              <div 
                className="h-full rounded-full bg-blue-500"
                style={{ width: `${(model.count / maxCount) * 100}%` }}
              ></div>
            </div>
            <div className="mt-1 flex justify-between text-xs text-gray-500">
              <span>推荐次数</span>
              <span className="text-green-600">{model.change}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}