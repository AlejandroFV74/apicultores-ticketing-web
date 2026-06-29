export default function AuthInput({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="
          w-full
          px-4
          py-3
          rounded-lg
          bg-background/50
          border
          border-border
          outline-none
          focus:border-neon-blue
          transition-colors
        "
      />
    </div>
  );
}