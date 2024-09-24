import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { createValue, normalizeName } from "../utils";
import { IFieldProps } from "./field";

export function CheckboxField({
  form,
  required,
  name,
  showLabel,
  fieldClassName,
  fieldContainerClassName,
  labelClassName,
}: IFieldProps) {
  const _name = normalizeName(name);
  return (
    <div className={cn("flex items-center gap-2 h-9", fieldContainerClassName)}>
      <Checkbox
        name={name}
        required={required}
        className={fieldClassName}
        // onBlur={form.handleBlur}
        onChange={form.handleChange}
        // defaultChecked={form.values[name] as boolean}
        defaultChecked={createValue(name, form.values)}
      />
      {showLabel && (
        <Label className={labelClassName}>
          {_name}
          {required && <span className="text-destructive">*</span>}
        </Label>
      )}
    </div>
  );
}
