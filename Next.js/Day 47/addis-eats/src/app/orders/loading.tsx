export default function Loading() {
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="h-8 w-48 bg-slate-200 rounded animate-pulse" />
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-12 bg-slate-100 rounded-lg animate-pulse" />
        ))}
      </div>
    </div>
  );
}
