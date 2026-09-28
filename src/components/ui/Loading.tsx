export function Loading() {
  return (
    <div className="flex items-center mx-auto p-8 my-8 justify-center">
      <div
        className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
        role="status"
        aria-label="loading"
      />
    </div>
  );
}
