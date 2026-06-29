import { NavLink } from "react-router-dom";
import { isOrganizer, isAdmin } from "../../../services/auth.service";

const publicLinks = [
  {
    label: "Explorar",
    path: "/",
  },
  {
    label: "Mis tickets",
    path: "/mytickets",
  },
];

const organizerLinks = [
  {
    label: "Mis eventos",
    path: "/organizer/events",
  },
  {
    label: "Crear evento",
    path: "/organizer/events/create",
  },
];

const adminLinks = [
  {
    label: "Admin Eventos",
    path: "/admin/events",
  },
  {
    label: "Admin Tickets",
    path: "/admin/tickets",
  },
  {
    label: "Escanear QR",
    path: "/organizer/tickets/scan",
  },
];

const adminLinks = [
  {
    label: "Dashboard",
    path: "/dashboard",
  },
];

export default function NavigationLinks({ mobile = false }) {
  const admin = isAdmin();
  const organizer = isOrganizer();

  let links = publicLinks;
  if (admin) {
    links = [...links, ...adminLinks];
  } else if (organizer) {
    links = [...links, ...organizerLinks];
  }

  return (
    <>
      {links.map((link) => (
        <NavLink
          key={link.path}
          to={link.path}
          className={({ isActive }) =>
            mobile
              ? `block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-neon-blue/10 text-neon-blue"
                    : "text-foreground/80 hover:bg-neon-blue/10 hover:text-neon-blue"
                }`
              : `whitespace-nowrap text-sm font-medium transition-colors ${
                  isActive
                    ? "text-neon-blue"
                    : "text-foreground/80 hover:text-neon-blue"
                }`
          }
        >
          {link.label}
        </NavLink>
      ))}
    </>
  );
}