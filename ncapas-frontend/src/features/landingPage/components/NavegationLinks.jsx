import { NavLink } from "react-router-dom";
import { isOrganizer } from "../../../services/auth.service";

const publicLinks = [
  {
    label: "Explorar",
    path: "/",
  },
  {
    label: "Categorías",
    path: "/categories",
  },
  {
    label: "Historial de compras",
    path: "/mytickets",
  },
  {
    label: "Soporte",
    path: "/support",
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
];

export default function NavigationLinks({ mobile = false }) {
  const links = isOrganizer()
    ? [...publicLinks, ...organizerLinks]
    : publicLinks;

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
