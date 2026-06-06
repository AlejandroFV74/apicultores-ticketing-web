import AuthButtons from "./AuthButtons";
import NavigationLinks from "./NavegationLinks";


export default function MobileMenu() {
  return (
    <div className="md:hidden border-t border-neon-blue/20 px-6 py-4 space-y-4">
      <NavigationLinks mobile />
      <AuthButtons mobile />
    </div>
  );
}