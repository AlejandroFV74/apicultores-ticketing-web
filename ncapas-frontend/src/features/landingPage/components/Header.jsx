import Logo from "./Logo";
import NavigationLinks from "./NavegationLinks";
import AuthButtons from "./AuthButtons";
import MobileMenu from "./MobileMenu";
import { getUser, isAuthenticated } from "../../../services/auth.service";
import LogoutButton from "./LogoutButton";

export default function Header({
  mobileMenuOpen,
  setMobileMenuOpen,
}) {
  const user = getUser();
  const authenticated = isAuthenticated();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-neon-blue/20 backdrop-blur-xl glassmorphism">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
        <Logo />

        <nav className="hidden lg:flex min-w-0 flex-1 items-center justify-center gap-6">
          <NavigationLinks />
        </nav>

        <div className="hidden md:flex shrink-0 items-center gap-3">
          {authenticated ? (
            <>
              <span className="max-w-40 truncate text-sm font-semibold text-neon-blue">
                {user?.fullName || user?.email || "Usuario"}
              </span>
              <LogoutButton />
            </>
          ) : (
            <AuthButtons />
          )}
        </div>

        <button
          type="button"
          onClick={() =>
            setMobileMenuOpen(!mobileMenuOpen)
          }
          className="md:hidden shrink-0 rounded-lg p-2 transition-colors hover:bg-neon-blue/10"
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
              className="h-6 w-6"
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
              className="h-6 w-6"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {mobileMenuOpen ? <MobileMenu /> : null}
    </header>
  );
}
