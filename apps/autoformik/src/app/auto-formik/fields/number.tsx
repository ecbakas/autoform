import { Label } from "@/components/ui/label";
import { IFieldProps } from "./field";
import { Input } from "@/components/ui/input";
import { normalizeName } from "../utils";

export function NumberField({
  form,
  placeholder,
  required,
  name,
  showLabel,
  fieldClassName,
  fieldContainerClassName,
  labelClassName,
}: IFieldProps) {
  const _name = normalizeName(name);
  return (
    <div className={fieldContainerClassName}>
      {showLabel && (
        <Label className={labelClassName} htmlFor={name}>
          {_name}
          {required && <span className="text-destructive">*</span>}
        </Label>
      )}
      <Input
        type={"number"}
        placeholder={placeholder}
        name={name}
        required={required}
        className={fieldClassName}
        onBlur={form.handleBlur}
        onChange={form.handleChange}
        value={form.values[name] as number}
      />
    </div>
  );
}
