export function Spinner({ className, ...props }) {
  return (
    <div className="flex items-center justify-center w-full p-4" {...props}>
      <div className="animate-spin w-8 h-8 border-4 border-primary border-r-transparent rounded-full">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
