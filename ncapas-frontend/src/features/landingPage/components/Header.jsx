import Logo from "./Logo";
import NavigationLinks from "./NavegationLinks";
import AuthButtons from "./AuthButtons";
import MobileMenu from "./MobileMenu";

export default function Header({
  mobileMenuOpen,
  setMobileMenuOpen,
}) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-neon-blue/20 backdrop-blur-xl glassmorphism">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Logo />

        <nav className="hidden md:flex items-center gap-8">
          <NavigationLinks />
        </nav>

        <div className="flex items-center gap-4">
          <AuthButtons />

          <button
            onClick={() =>
              setMobileMenuOpen(!mobileMenuOpen)
            }
            className="md:hidden p-2 hover:bg-neon-blue/10 rounded-lg transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? (
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
                className="w-6 h-6"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            ) : (
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
                className="w-6 h-6"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && <MobileMenu />}
    </header>
  );
}