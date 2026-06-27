import { useState } from "react";

function SearchBar({ onSearch, onClear }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      onSearch(trimmed);
    } else {
      onClear();
    }
  };

  const handleClear = () => {
    setQuery("");
    onClear();
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 max-w-xl mx-auto mb-10">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar eventos por título..."
        className="flex-1 border border-ink/20 bg-white p-2.5 rounded focus:outline-none focus:ring-2 focus:ring-stub/50"
      />
      <button
        type="submit"
        className="bg-stub hover:bg-stub-dark text-white px-5 rounded font-semibold uppercase text-sm tracking-wide transition-colors"
      >
        Buscar
      </button>
      {query && (
        <button
          type="button"
          onClick={handleClear}
          className="border border-ink/20 text-ink-soft px-4 rounded text-sm hover:bg-ink/5 transition-colors"
        >
          Limpiar
        </button>
      )}
    </form>
  );
}

export default SearchBar;
