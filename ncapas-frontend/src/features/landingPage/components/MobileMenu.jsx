import { getUser, isAuthenticated } from "../../../services/auth.service";
import AuthButtons from "./AuthButtons";
import NavigationLinks from "./NavegationLinks";


export default function MobileMenu() {

  const user = getUser();

  return (
    <div className="md:hidden border-t border-neon-blue/20 px-6 py-4 space-y-4">
      <NavigationLinks mobile />
      {
        isAuthenticated() ? (
          <>
            <span className="text-lg font-bold text-neon-blue">{user.fullName}</span>
          </>
        ) : (
          <>
            <AuthButtons mobile />
          </>         
        )
      }
      
    </div>
  );
}