import { useState } from "react";
import Header from "./components/Header";
import EventsSection from "./components/EventsSection";
import { HeroSection } from "./components/hero-section";
import Footer from "./components/Footer";

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground dark">
      <Header
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <HeroSection />
      <EventsSection />

      <Footer />
    </div>
  );
}