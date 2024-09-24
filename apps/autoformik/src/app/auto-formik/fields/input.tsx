import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createValue, normalizeName } from "../utils";
import { IFieldProps } from "./field";

export function InputField({
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
        <Label className={labelClassName}>
          {_name}
          {required && <span className="text-destructive">*</span>}
        </Label>
      )}
      <Input
        type={"text"}
        placeholder={placeholder}
        name={name}
        required={required}
        className={fieldClassName}
        onBlur={form.handleBlur}
        onChange={form.handleChange}
        value={createValue(name, form.values)}
      />
    </div>
  );
}
