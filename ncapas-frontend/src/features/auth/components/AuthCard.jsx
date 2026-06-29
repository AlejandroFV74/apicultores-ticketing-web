export default function AuthCard({
  children,
}) {
  return (
    <div className="w-full max-w-md">
      <div className="glass-card p-8">
        {children}
      </div>
    </div>
  );
}