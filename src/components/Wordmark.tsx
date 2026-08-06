export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`wordmark ${className}`} aria-hidden="true">
      <span>web</span>
      <span>fusion</span>
      <span>lab</span>
    </span>
  );
}
