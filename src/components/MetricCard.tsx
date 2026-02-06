// /src/components/MetricCard.tsx
interface MetricCardProps {
  title: string;
  value: string;
  change?: string;
  icon?: string;
  description?: string;
}

export default function MetricCard({ 
  title, 
  value, 
  change, 
  icon = "📊",
  description 
}: MetricCardProps) {
  const isPositive = change?.startsWith('+');
  
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-2xl">{icon}</span>
            <h3 className="text-sm font-medium text-gray-600">{title}</h3>
          </div>
          <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
        </div>
        {change && (
          <div className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${
            isPositive 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {isPositive ? '↑' : '↓'} {change}
          </div>
        )}
      </div>
      {description && (
        <p className="mt-3 text-sm text-gray-500">{description}</p>
      )}
    </div>
  );
}