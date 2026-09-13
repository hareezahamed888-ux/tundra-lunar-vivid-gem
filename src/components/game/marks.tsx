import { cn } from "@/lib/utils";

export function MarkX({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={cn("xo-mark text-mark-x", className)}
      aria-hidden="true"
    >
      <path className="xo-stroke xo-stroke-a" d="M22 22 L78 78" />
      <path className="xo-stroke xo-stroke-b" d="M78 22 L22 78" />
    </svg>
  );
}

export function MarkO({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={cn("xo-mark text-mark-o", className)}
      aria-hidden="true"
    >
      <circle className="xo-stroke xo-stroke-o" cx="50" cy="50" r="30" />
    </svg>
  );
}
