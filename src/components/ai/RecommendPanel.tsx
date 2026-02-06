export default function RecommendPanel({ rec }: any) {
  if (!rec) return null;

  return (
    <div className="mt-6 border-t pt-4">
      <h3 className="font-semibold mb-2">推荐机型</h3>
      <div className="bg-gray-50 rounded-lg p-3">
        <p className="font-bold">{rec.model}</p>
        <p className="text-sm mt-1 text-gray-700">{rec.reason}</p>

        <button className="mt-3 w-full bg-green-600 text-white py-2 rounded">
          生成到店购机方案
        </button>
      </div>
    </div>
  );
}
