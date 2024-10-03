import { cn } from "@/lib/utils";
import { ObjectFieldTemplateProps } from "@rjsf/utils";

export function ObjectFieldTemplate(props: ObjectFieldTemplateProps) {
  return (
    <>
      {/* {props.title} */}
      {/* {props.description} */}
      {props.properties.map((element) => (
        <div
          key={element.name}
          className={cn(
            "space-y-2 field-property",
            props.uiSchema?.["ui:classNames"],
          )}
        >
          {element.content}
        </div>
      ))}
    </>
  );
}
