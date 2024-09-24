import { cn } from "@/lib/utils";
import { FormikFormType } from "..";
import { $AutoFormikSchema, ObjectProperty } from "../types";
import { FieldsFromArray } from "./array";
import { CreateField } from "./field";

export function AutoFormikObject({
  object,
  name,
  form,
  children,
}: {
  object: ObjectProperty | $AutoFormikSchema;
  name?: string;
  form: FormikFormType;
  children?: JSX.Element;
}): JSX.Element | JSX.Element[] {
  if (!object.properties) return <></>;
  return (
    <div className={cn("object space-y-2")} id={name} key={name}>
      {Object.keys(object.properties).map(
        (key: string, index: number): JSX.Element => {
          const field =
            object.properties?.[key as keyof typeof object.properties];
          const fullName = name ? name + "." + key : key;
          if (!field) return <></>;
          if (field.type === "object") {
            return (
              <AutoFormikObject
                key={fullName}
                object={field}
                name={fullName}
                form={form}
              />
            );
          }
          if (field.type === "array") {
            console.log(fullName + index);
            return (
              <FieldsFromArray
                key={fullName + index}
                array={field}
                name={fullName}
                form={form}
              />
            );
          }
          if (key === "extraProperties") return <></>;
          return (
            <div className="item-in-object" key={fullName}>
              <CreateField
                name={fullName}
                type={field.type}
                form={form}
                required={object?.required?.includes(key)}
              />
            </div>
          );
        },
      )}
      {children}
    </div>
  );
}
