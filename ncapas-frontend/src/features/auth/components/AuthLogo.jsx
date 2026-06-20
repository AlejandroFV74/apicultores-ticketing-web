export default function AuthLogo({
  title = "EventHub",
  subtitle,
}) {
  return (
    <div className="flex flex-col items-center mb-10">
      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center mb-4">
        <span className="text-white text-2xl font-black">
          E
        </span>
      </div>

      <h1 className="text-3xl font-black">
        {title}
      </h1>

      {subtitle && (
        <p className="text-foreground/60 mt-2 text-center">
          {subtitle}
        </p>
      )}
    </div>
  );
}