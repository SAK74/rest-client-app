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
  label: string;
  options: SelectOption[];
  onChange: (value: string) => void;
}

export function Select({ options, label, onChange, value }: SelectProps) {
  return (
    <div>
      <label>{label}</label>
      <SelectUi onValueChange={onChange} value={value}>
        <SelectTrigger>
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
