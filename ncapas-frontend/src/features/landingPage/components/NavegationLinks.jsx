import { NavLink } from "react-router-dom";
import { isOrganizer, isAdmin, isAuthenticated } from "../../../services/auth.service";

const publicLinks = [
  {
    label: "Explorar",
    path: "/",
  },
  {
    label: "Historial de tickets",
    path: "/history",
  },
  {
    label: "Mis tickets",
    path: "/mytickets",
  },
  {
    label: "Notificaciones",
    path: "/notifications",
  },
];

const organizerLinks = [
  {
    label: "Crear eventos",
    path: "/organizer/events/create",
  },
  {
    label: "Mostrar eventos",
    path: "/organizer/events",
  },
  {
    label: "Editar eventos",
    path: "/organizer/events/edit",
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
  const isOrg = isOrganizer();
  const isAdminUser = isAdmin();
  const isAuth = isAuthenticated();

  let links = [];

  if (isAdminUser) {
    links = [...links, ...adminLinks];
  }

  links = [...links, ...publicLinks];

  if (isOrg) {
    links = [...links, ...organizerLinks];
  }

  if (!isAuth) {
    links = links.filter(link => link.path !== "/mytickets");
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