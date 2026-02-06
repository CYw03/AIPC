// components/UserSummary.tsx
export default function UserSummary() {
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h3 className="font-semibold">客户 AI 摘要</h3>
      <ul className="mt-2 text-sm">
        <li>🎯 场景：AI 训练</li>
        <li>💰 预算：¥15,000</li>
        <li>🔥 转化概率：85%</li>
      </ul>
    </div>
  );
}
