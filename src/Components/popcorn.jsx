import Reaect, { useMemo } from "react";

const PopcornRain = () => {
  const sprites = useMemo(() => {
    const imgs = [
      "/Assets/popcorn/pop1.png",
      "/Assets/popcorn/pop2.png",
      "/Assets/popcorn/pop3.png",
      "/Assets/popcorn/pop4.png",
    ];

    const count = 24;
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      src: imgs[i % imgs.length],
      left: Math.random() * 100,
      size: 40 + Math.random() * 70,
      delay: Math.random() * 1.5,
      duration: 6 + Math.random() * 6,
      spin: Math.random() > 0.5 ? 1 : -1,
    }));
  }, []);

  return (
    <div className="popcorn__rain">
      {sprites.map((s) => (
        <img
          key={s.id}
          src={s.src}
          className="popcorn__kernel"
          style={{
            left: `${s.left}%`,
            width: `${s.size}px`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
            "--spinDir": s.spin,
          }}
        />
      ))}
    </div>
  );
};

export default PopcornRain;
