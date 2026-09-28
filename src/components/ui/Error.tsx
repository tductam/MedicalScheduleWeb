import { AlertCircle } from "lucide-react";

interface ErrorProps {
  onRetry: () => void;
  message: string;
}

export function Error({ message, onRetry }: ErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 mx-auto my-8">
      <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-500 mb-3">
        <AlertCircle className="w-6 h-6" />
      </div>
      <p className="text-sm text-zinc-600 mb-4 max-w-xs">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="bg-zinc-900 px-4 py-2 text-xs font-medium text-white hover:bg-zinc-800 transition-colors shadow-xs cursor-pointer"
      >
        Thử lại
      </button>
    </div>
  );
}
