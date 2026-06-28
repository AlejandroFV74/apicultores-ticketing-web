export default function EventInfoItem({ label, value, children }) {
  return (
    <div className="glass-card p-5">
      <p className="text-sm text-foreground/50 mb-2">
        {label}
      </p>
      <div className="text-lg font-semibold text-foreground">
        {children ?? value}
      </div>
    </div>
  );
}
