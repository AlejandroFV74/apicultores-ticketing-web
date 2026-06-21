const links = [
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

export default function NavigationLinks({
  mobile = false,
}) {
  return (
    <>
      {links.map((link) => (
        <a
          key={link.path}
          href={link.path}
          className={
            mobile
              ? "block text-sm font-medium hover:text-neon-blue transition-colors"
              : "text-sm font-medium hover:text-neon-blue transition-colors"
          }
        >
          {link.label}
        </a>
      ))}
    </>
  );
}