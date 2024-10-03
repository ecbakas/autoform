import { Input } from "@/components/ui/input";
import { WidgetProps } from "@rjsf/utils";

export const CustomTextInput = function (props: WidgetProps) {
  return (
    <Input
      type={props.type}
      id={props.id}
      className={props.className}
      required={props.required}
      onChange={(event) => props.onChange(event.target.value)}
      defaultValue={props.defaultValue}
      readOnly={props.readOnly}
      disabled={props.disabled || props.readOnly}
    />
  );
};
