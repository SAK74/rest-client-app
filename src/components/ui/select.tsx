interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  value?: string;
  label: string;
  options: SelectOption[];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function Select({
  options,
  label,
  onChange,
  value,
}: SelectProps) {
  return (
    <div>
      <label>{label}</label>
      <select
        value={value}
        onChange={onChange}
        className="block px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
