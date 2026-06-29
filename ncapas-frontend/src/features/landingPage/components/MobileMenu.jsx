import { getUser, isAuthenticated } from "../../../services/auth.service";
import AuthButtons from "./AuthButtons";
import NavigationLinks from "./NavegationLinks";
import LogoutButton from "./LogoutButton";

export default function MobileMenu() {
  const user = getUser();
  const authenticated = isAuthenticated();

  return (
    <div className="md:hidden border-t border-neon-blue/20 px-6 py-4 space-y-4">
      <nav className="space-y-1">
        <NavigationLinks mobile />
      </nav>

      {authenticated ? (
        <div className="border-t border-neon-blue/20 pt-4">
          <p className="mb-3 truncate text-sm font-semibold text-neon-blue">
            {user?.fullName || user?.email || "Usuario"}
          </p>
          <LogoutButton mobile />
        </div>
      ) : (
        <AuthButtons mobile />
      )}
    </div>
  );
}
