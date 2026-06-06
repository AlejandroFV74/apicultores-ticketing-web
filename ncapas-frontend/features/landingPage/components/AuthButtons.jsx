export default function AuthButtons({
  mobile = false,
}) {
  if (mobile) {
    return (
      <div className="flex gap-2 pt-4 border-t border-neon-blue/20">
        <button className="flex-1 px-4 py-2 text-sm font-medium border border-neon-blue/30 rounded-lg">
          Ingresar
        </button>

        <button className="flex-1 px-4 py-2 text-sm font-medium bg-gradient-to-r from-neon-blue to-neon-purple text-background rounded-lg">
          Registrarse
        </button>
      </div>
    );
  }

  return (
    <>
      <button className="hidden sm:inline px-4 py-2 text-sm font-medium border border-neon-blue/30 rounded-lg hover:border-neon-blue hover:bg-neon-blue/10 transition-colors">
        Ingresar
      </button>

      <button className="hidden sm:inline px-4 py-2 text-sm font-medium bg-gradient-to-r from-neon-blue to-neon-purple text-background rounded-lg hover:shadow-lg hover:shadow-neon-blue/50 transition-all">
        Registrarse
      </button>
    </>
  );
}