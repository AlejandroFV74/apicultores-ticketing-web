const links = [
  "Explorar",
  "Categorías",
  "Favoritos",
  "Soporte",
];

export default function NavigationLinks({
  mobile = false,
}) {
  return (
    <>
      {links.map((link) => (
        <a
          key={link}
          href="#"
          className={
            mobile
              ? "block text-sm font-medium hover:text-neon-blue transition-colors"
              : "text-sm font-medium hover:text-neon-blue transition-colors"
          }
        >
          {link}
        </a>
      ))}
    </>
  );
}