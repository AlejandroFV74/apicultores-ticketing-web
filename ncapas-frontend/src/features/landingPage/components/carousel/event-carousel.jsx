import { useState, useRef } from "react";
import EventCard from "./components/EventCard";

export function EventCarousel({events = []}) {
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