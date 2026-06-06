import { useState, useRef } from "react";
import EventCard from "./components/EventCard";


const events = [
  {
    id: "1",
    title: "Electric Dreams Festival",
    date: "JUN 15, 2026",
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=600&fit=crop",
    category: "Music Festival",
  },
  {
    id: "2",
    title: "Neon Nights Concert",
    date: "JUN 22, 2026",
    image:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&h=600&fit=crop",
    category: "Live Concert",
  },
  {
    id: "3",
    title: "Synthwave Rave Experience",
    date: "JUL 05, 2026",
    image:
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=500&h=600&fit=crop",
    category: "Electronic Music",
  },
  {
    id: "4",
    title: "Future Sounds Expo",
    date: "JUL 18, 2026",
    image:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&h=600&fit=crop",
    category: "Music Festival",
  },
  {
    id: "5",
    title: "Cyber Pulse Showcase",
    date: "AUG 01, 2026",
    image:
      "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=500&h=600&fit=crop",
    category: "Live Show",
  },
];

export function EventCarousel() {
  const [scrollPosition, setScrollPosition] =
    useState(0);

  const carouselRef = useRef(null);

  const scroll = (direction) => {
    if (!carouselRef.current) return;

    const scrollAmount = 400;

    const newPosition =
      direction === "left"
        ? Math.max(
            scrollPosition - scrollAmount,
            0
          )
        : scrollPosition + scrollAmount;

    carouselRef.current.scrollTo({
      left: newPosition,
      behavior: "smooth",
    });

    setScrollPosition(newPosition);
  };

  return (
    <div className="relative w-full">
      <div
        ref={carouselRef}
        className="flex gap-6 overflow-x-auto scroll-smooth pb-4"
      >
        {events.map((event) => (
          <EventCard
            key={event.id}
            event={event}
          />
        ))}
      </div>

      {/* Botón izquierda */}
      <button
        onClick={() => scroll("left")}
        className="absolute -left-6 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full glass-card backdrop-blur-xl transition-all duration-300 hover:bg-neon-blue/20 hover:border-neon-blue/50 group"
        aria-label="Scroll Left"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6 text-foreground group-hover:text-neon-blue transition-colors"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
      </button>

      {/* Botón derecha */}
      <button
        onClick={() => scroll("right")}
        className="absolute -right-6 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full glass-card backdrop-blur-xl transition-all duration-300 hover:bg-neon-blue/20 hover:border-neon-blue/50 group"
        aria-label="Scroll Right"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6 text-foreground group-hover:text-neon-blue transition-colors"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>
    </div>
  );
}