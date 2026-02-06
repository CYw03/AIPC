export default function RecommendCard({
  model,
  reason,
}: {
  model: string;
  reason: string;
}) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">推荐机型</h3>
      <p className="text-lg font-semibold">{model}</p>
      <p className="mt-2 text-gray-700">{reason}</p>
      <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
        到店咨询
      </button>
    </div>
  );
}
