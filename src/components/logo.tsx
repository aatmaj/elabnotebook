import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("text-primary", className)}
    >
      <circle cx="12" cy="12" r="1" />
      <path d="M20.2 20.2c2.04-2.04.02-5.91-4.44-4.44" />
      <path d="M3.8 3.8c-2.04 2.04-.02 5.91 4.44 4.44" />
      <path d="M20.2 3.8c-2.04 2.04-.02 5.91-4.44 4.44" />
      <path d="M3.8 20.2c2.04-2.04.02-5.91 4.44-4.44" />
      <path d="M12 2a10 10 0 0 0-7.53 16.59" />
      <path d="M12 22a10 10 0 0 0 7.53-16.59" />
    </svg>
  );
}
