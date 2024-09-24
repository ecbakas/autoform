import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ErrorMessage as DefaultErrorMessage } from "formik";
import { FormikFormType } from "..";
import { createValue, normalizeName } from "../utils";
import { NumberField } from "./number";
import { CheckboxField } from "./checkbox";
import { InputField } from "./input";

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

function FieldsByType(props: IFieldProps) {
  switch (props.type) {
    case "number":
      return <NumberField {...props} />;
    case "boolean":
      return <CheckboxField {...props} />;
    default:
      return <InputField {...props} />;
  }
}

export function CreateField({
  name,
  type,
  placeholder,
  required = false,
  isLoading = false,
  showLabel = true,
  className,
  fieldClassName,
  errorClassName,
  form,
}: IFieldProps): JSX.Element {
  return (
    <Field
      name={name}
      type={type}
      placeholder={placeholder}
      required={required}
      isLoading={isLoading}
      showLabel={showLabel}
      className={className}
      fieldClassName={fieldClassName}
      errorClassName={errorClassName}
      form={form}
    />
  );
}
