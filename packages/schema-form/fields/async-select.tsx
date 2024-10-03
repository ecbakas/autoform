import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { WidgetProps } from "@rjsf/utils";

export const AsyncSelect = function (props: WidgetProps) {
  return (
    <Select
      autoComplete="on"
      onValueChange={(data) => {
        if (props.uiSchema?.onChange) props.uiSchema.onChange(data);
        props.onChange(data);
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={props.placeholder} />
      </SelectTrigger>
      <SelectContent>
        {props.uiSchema?.enum?.map((option: Record<string, string>) => {
          return (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};
