import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ErrorMessage as DefaultErrorMessage } from "formik";
import { FormikFormType, ValueType } from "..";

export type FieldTypes = "string" | "number" | "boolean" | "integer" | "null";
export interface IFieldProps {
  name: string;
  type?: FieldTypes;
  placeholder?: string;
  required?: boolean;
  isLoading?: boolean;
  showLabel?: boolean;
  className?: string;
  fieldClassName?: string;
  fieldContainerClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  form: FormikFormType;
}

export default function Field({
  name,
  type,
  placeholder,
  required = false,
  isLoading = false,
  showLabel = true,
  className,
  fieldClassName,
  fieldContainerClassName,
  labelClassName,
  errorClassName,
  form,
}: IFieldProps) {
  return (
    <div className={cn("", className)}>
      <FieldsByType
        type={type}
        form={form}
        placeholder={placeholder}
        required={required}
        name={name}
        fieldClassName={fieldClassName}
        fieldContainerClassName={fieldContainerClassName}
        labelClassName={labelClassName}
        showLabel={showLabel}
      />
      <DefaultErrorMessage
        name={name}
        component="div"
        className={cn("text-destructive text-sm", errorClassName)}
      />
    </div>
  );
}

function FieldsByType({
  type,
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
  switch (type) {
    case "number":
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
    case "boolean":
      return (
        <div
          className={cn("flex items-center gap-2 h-9", fieldContainerClassName)}
        >
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
    default:
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
}
export function createValue(name: string, param: any) {
  const temp = name.split(".");
  if (!param) return undefined;
  if (temp.length == 1) {
    return param[temp[0]];
  }
  return createValue(temp.slice(1).join("."), param[temp[0]]);
}
// function createValue2(name: string, param: any) {
//   const keys: Array<string> = name.split(".");
//   let value = param;
//   for (let key of keys) {
//     if (typeof value[key] === "object" && value[key]) value = value[key];
//   }
//   return value;
// }
export function normalizeName(name: string) {
  // return name;

  const _name = name.split(".").at(-1);
  let returnName = _name;
  if (!returnName) return name;
  // remove is from the begining of the string if it exists
  if (returnName.startsWith("is")) {
    returnName = returnName.slice(2);
  }
  // seperate camelCase
  returnName = returnName.replace(/([A-Z])/g, " $1");
  // make first letter uppercase
  returnName = returnName.charAt(0).toUpperCase() + returnName.slice(1);
  return returnName;
}
