import { Logo } from './logo';

export function Bubbles() {
  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
      <div className="logos">
        {[...Array(15)].map((_, i) => (
          <Logo key={i} className="logo" />
        ))}
      </div>
      <style jsx>{`
        .logos {
          position: absolute;
          width: 100%;
          height: 100%;
          z-index: 0;
          overflow: hidden;
          top: 0;
          left: 0;
        }
        .logo {
          position: absolute;
          bottom: -100px;
          width: 40px;
          height: 40px;
          color: hsl(var(--primary) / 0.1);
          opacity: 0.5;
          animation: rise 25s infinite ease-in;
        }
        .logo:nth-child(1) { left: 10%; animation-duration: 18s; width: 80px; height: 80px; }
        .logo:nth-child(2) { left: 20%; animation-duration: 15s; animation-delay: 1s; }
        .logo:nth-child(3) { left: 25%; animation-duration: 17s; animation-delay: 2s; width: 30px; height: 30px; }
        .logo:nth-child(4) { left: 40%; animation-duration: 21s; animation-delay: 0s; width: 60px; height: 60px; }
        .logo:nth-child(5) { left: 50%; animation-duration: 16s; animation-delay: 3s; }
        .logo:nth-child(6) { left: 65%; animation-duration: 18s; animation-delay: 1s; width: 50px; height: 50px; }
        .logo:nth-child(7) { left: 75%; animation-duration: 22s; animation-delay: 2s; width: 70px; height: 70px; }
        .logo:nth-child(8) { left: 80%; animation-duration: 16s; animation-delay: 2s; }
        .logo:nth-child(9) { left: 55%; animation-duration: 19s; animation-delay: 0s; width: 25px; height: 25px; }
        .logo:nth-child(10) { left: 90%; animation-duration: 15s; animation-delay: 4s; }
        .logo:nth-child(11) { left: 5%; animation-duration: 24s; width: 45px; height: 45px; }
        .logo:nth-child(12) { left: 30%; animation-duration: 19s; animation-delay: 5s; }
        .logo:nth-child(13) { left: 45%; animation-duration: 17s; animation-delay: 3s; width: 35px; height: 35px; }
        .logo:nth-child(14) { left: 60%; animation-duration: 20s; animation-delay: 1s; }
        .logo:nth-child(15) { left: 85%; animation-duration: 16s; animation-delay: 3s; width: 55px; height: 55px; }

        @keyframes rise {
          0% {
            bottom: -100px;
            transform: translateX(0) rotate(0deg);
          }
          50% {
            transform: translate(100px) rotate(180deg);
          }
          100% {
            bottom: 1080px;
            transform: translateX(-200px) rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
