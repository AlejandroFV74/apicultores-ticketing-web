export default function SearchBar({
  value,
  onChange,
  placeholder = "Buscar por título o lugar",
}) {
  return (
    <label className="relative block w-full">
      <span className="sr-only">Buscar evento</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-foreground/40"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>

      <input
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-neon-blue/20 bg-background/70 py-3 pl-12 pr-4 text-foreground placeholder:text-foreground/40 outline-none transition focus:border-neon-blue/60 focus:ring-2 focus:ring-neon-blue/20"
      />
    </label>
  );
}
