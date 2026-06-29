import { useState } from "react";
import Header from "./components/Header";
import EventsSection from "./components/EventsSection";
import { HeroSection } from "./components/hero-section";
import Footer from "./components/Footer";
import { useEvents } from "../../hooks/useEvents";


export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const {
    events,
    loading,
    error,
  } = useEvents();


  return (
    <div className="min-h-screen bg-background text-foreground dark">
      <Header
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <HeroSection />

      <div className="px-8">
        {loading ? (
          <p>Cargando eventos...</p>
        ) : error ? (
          <p>Error cargando eventos</p>
        ) : (
          <EventsSection events={events} />
        )}
      </div>
      <Footer />
    </div>
  );
}