import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className={cn("text-primary", className)}
    >
      <defs>
        <radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" style={{ stopColor: "hsl(var(--accent))", stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: "hsl(var(--primary))", stopOpacity: 1 }} />
        </radialGradient>
        <filter id="glow">
            <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
            <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
            </feMerge>
        </filter>
      </defs>
      <circle cx="50" cy="50" r="40" fill="url(#grad1)" filter="url(#glow)" />
      <circle cx="50" cy="50" r="20" fill="hsl(var(--primary-foreground))" fillOpacity="0.3" />
    </svg>
  );
}
