import React from "react";
import { useEffect, useState } from "react";

const ICON_SOURCES = [
  "/Assets/film-solid-full.svg",
  "/Assets/ticket-solid-full.svg",
  "/Assets/video-solid-full.svg",
];

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function debounce(fn, wait = 200) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
  };
}

export default function LandingIcons() {
  const [icons, setIcons] = useState([]);

  useEffect(() => {
    const scatter = () => {
      const base = Math.max(12, Math.floor(window.innerWidth / 80));
      const next = Array.from({ length: base }, () => ({
        src: ICON_SOURCES[Math.floor(Math.random() * ICON_SOURCES.length)],
        size: rand(28, 90),
        left: rand(0, 100),
        top: rand(0, 100),
        rotate: rand(0, 360),
        opacity: rand(0.08, 0.18),
      }));
      setIcons(next);
    };

    scatter();
    const onResize = debounce(scatter, 200);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div id="bg-icons">
      {icons.map((i, idx) => (
        <img
          key={idx}
          src={i.src}
          alt=""
          style={{
            position: "absolute",
            width: `${i.size}px`,
            height: "auto",
            left: `${i.left}%`,
            top: `${i.top}%`,
            transform: `translate(-50%, -50%) rotate(${i.rotate}deg)`,
            opacity: i.opacity,
            pointerEvents: "none",
          }}
        />
      ))}
    </div>
  );
}
