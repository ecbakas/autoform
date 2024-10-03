import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { WidgetProps } from "@rjsf/utils";

export const CustomSelect = function (props: WidgetProps) {
  return (
    <Select
      onValueChange={(value) => {
        props.onChange(JSON.parse(value));
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={props.placeholder} />
      </SelectTrigger>
      <SelectContent>
        {props.options.enumOptions?.map((enumOption, i) => {
          return (
            <SelectItem
              key={JSON.stringify(enumOption.value)}
              value={JSON.stringify(enumOption.value)}
            >
              {enumOption.label}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};
