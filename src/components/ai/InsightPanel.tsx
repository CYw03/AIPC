export default function InsightPanel({
  profile,
}: {
  profile: any;
}) {
  // ✅ 给一个安全的默认值
  const insight = profile ?? {
    scene: null,
    budget: null,
    preference: null,
  };

  return (
    <div className="h-full p-4">
      <h3 className="mb-3 font-semibold">AI 洞察</h3>

      <ul className="space-y-2 text-sm text-gray-700">
        <li>🎯 使用场景：{insight.scene || "识别中"}</li>
        <li>💰 预算区间：{insight.budget || "待确认"}</li>
        <li>⚙️ 偏好：{insight.preference || "未明确"}</li>
      </ul>
    </div>
  );
}
