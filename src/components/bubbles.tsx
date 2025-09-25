export function Bubbles() {
  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
      <div className="bubbles">
        {[...Array(15)].map((_, i) => (
          <div key={i} className="bubble" />
        ))}
      </div>
      <style jsx>{`
        .bubbles {
          position: absolute;
          width: 100%;
          height: 100%;
          z-index: 0;
          overflow: hidden;
          top: 0;
          left: 0;
        }
        .bubble {
          position: absolute;
          bottom: -100px;
          width: 40px;
          height: 40px;
          background-color: hsl(var(--primary) / 0.2);
          border-radius: 50%;
          opacity: 0.5;
          animation: rise 10s infinite ease-in;
        }
        .bubble:nth-child(1) { left: 10%; animation-duration: 8s; width: 80px; height: 80px; }
        .bubble:nth-child(2) { left: 20%; animation-duration: 5s; animation-delay: 1s; }
        .bubble:nth-child(3) { left: 25%; animation-duration: 7s; animation-delay: 2s; width: 30px; height: 30px; }
        .bubble:nth-child(4) { left: 40%; animation-duration: 11s; animation-delay: 0s; width: 60px; height: 60px; }
        .bubble:nth-child(5) { left: 50%; animation-duration: 6s; animation-delay: 3s; }
        .bubble:nth-child(6) { left: 65%; animation-duration: 8s; animation-delay: 1s; width: 50px; height: 50px; }
        .bubble:nth-child(7) { left: 75%; animation-duration: 12s; animation-delay: 2s; width: 70px; height: 70px; }
        .bubble:nth-child(8) { left: 80%; animation-duration: 6s; animation-delay: 2s; }
        .bubble:nth-child(9) { left: 55%; animation-duration: 9s; animation-delay: 0s; width: 25px; height: 25px; }
        .bubble:nth-child(10) { left: 90%; animation-duration: 5s; animation-delay: 4s; }
        .bubble:nth-child(11) { left: 5%; animation-duration: 14s; width: 45px; height: 45px; }
        .bubble:nth-child(12) { left: 30%; animation-duration: 9s; animation-delay: 5s; }
        .bubble:nth-child(13) { left: 45%; animation-duration: 7s; animation-delay: 3s; width: 35px; height: 35px; }
        .bubble:nth-child(14) { left: 60%; animation-duration_ 10s; animation-delay: 1s; }
        .bubble:nth-child(15) { left: 85%; animation-duration: 6s; animation-delay: 3s; width: 55px; height: 55px; }

        @keyframes rise {
          0% {
            bottom: -100px;
            transform: translateX(0);
          }
          50% {
            transform: translate(100px);
          }
          100% {
            bottom: 1080px;
            transform: translateX(-200px);
          }
        }
      `}</style>
    </div>
  );
}
