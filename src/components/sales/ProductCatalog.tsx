// /src/components/sales/ProductCatalog.tsx
interface ProductCatalogProps {
  customerTags?: string[];
}

export default function ProductCatalog({ customerTags = [] }: ProductCatalogProps) {
  const products = [
    { id: 1, name: "ThinkPad X1 Carbon AI", price: "¥13,999", tags: ["商务旗舰", "顶级NPU"], match: 95 },
    { id: 2, name: "Yoga 9i AI", price: "¥9,999", tags: ["创意设计", "OLED屏"], match: 88 },
    { id: 3, name: "小新 Pro 14 AI", price: "¥6,999", tags: ["性价比", "轻薄"], match: 76 },
    { id: 4, name: "拯救者 Y9000X AI", price: "¥11,999", tags: ["游戏性能", "RTX显卡"], match: 82 },
  ];

  return (
    <div className="space-y-3">
      {products.map((product) => (
        <div key={product.id} className="rounded-lg border p-3 hover:border-blue-300 hover:bg-blue-50">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-medium">{product.name}</h4>
              <p className="text-sm text-gray-600">{product.price}</p>
              <div className="mt-2 flex flex-wrap gap-1">
                {product.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">匹配度</div>
              <div className="text-lg font-bold text-blue-600">{product.match}%</div>
            </div>
          </div>
          <button className="mt-3 w-full rounded-lg bg-blue-600 py-2 text-sm text-white hover:bg-blue-700">
            加入报价单
          </button>
        </div>
      ))}
    </div>
  );
}