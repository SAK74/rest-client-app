interface InputProps {
  id: string;
  label: string;
}

export default function Input({ id, label }: InputProps) {
  return (
    <div className="w-full max-w-sm min-w-[600px]">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        className="w-full bg-transparent placeholder:text-slate-500 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
        placeholder="Type here..."
      />
    </div>
  );
}
