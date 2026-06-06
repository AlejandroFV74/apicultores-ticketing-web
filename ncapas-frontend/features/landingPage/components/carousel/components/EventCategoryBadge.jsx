export default function EventCategoryBadge({
  category,
}) {
  return (
    <div className="absolute top-4 left-4 bg-neon-purple/20 border border-neon-purple/50 rounded-full px-3 py-1">
      <span className="text-xs font-medium text-neon-purple">
        {category}
      </span>
    </div>
  );
}