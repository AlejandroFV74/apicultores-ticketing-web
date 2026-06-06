export default function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center">
        <span className="text-white font-black text-lg">E</span>
      </div>

      <span className="text-xl font-black">
        EventHub
      </span>
    </div>
  );
}