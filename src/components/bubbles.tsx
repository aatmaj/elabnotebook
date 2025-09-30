import { Logo } from './logo';

export function Bubbles() {
  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
      <div className="logos">
        {[...Array(15)].map((_, i) => (
          <Logo key={i} className="logo" />
        ))}
      </div>
    </div>
  );
}
