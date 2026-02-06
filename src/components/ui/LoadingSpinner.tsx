// /src/components/ui/LoadingSpinner.tsx
interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

export default function LoadingSpinner({ size = 'md', color = 'blue' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8', 
    lg: 'h-12 w-12'
  };

  const colorClasses = {
    blue: 'border-blue-500 border-t-transparent',
    green: 'border-green-500 border-t-transparent',
    purple: 'border-purple-500 border-t-transparent',
    gray: 'border-gray-500 border-t-transparent'
  };

  return (
    <div className="flex items-center justify-center">
      <div className={`${sizeClasses[size]} animate-spin rounded-full border-2 ${colorClasses[color as keyof typeof colorClasses]}`}></div>
    </div>
  );
}