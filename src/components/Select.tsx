import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  Select as SelectUi,
  SelectValue,
} from "./ui/select";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  value?: string;
  label?: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  size?: "sm" | "default";
}

export function Select({ options, label, onChange, value, size }: SelectProps) {
  return (
    <div>
      {label && <label>{label}</label>}
      <SelectUi onValueChange={onChange} value={value}>
        <SelectTrigger size={size}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map(({ label, value }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectUi>
    </div>
  );
}
