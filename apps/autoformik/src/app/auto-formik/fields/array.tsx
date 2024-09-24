import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FieldArray } from "formik";
import { FormikFormType } from "..";
import { ArrayProperty } from "../types";
import { AutoFormikObject } from "./object";
import { createValue, initialsFromObject, normalizeName } from "../utils";

export function FieldsFromArray({
  array,
  name,
  form,
}: {
  array: ArrayProperty;
  name: string;
  form: FormikFormType;
}): JSX.Element | JSX.Element[] {
  return (
    <FieldArray name={name} key={name + 1}>
      {(arrayHelpers) => {
        const value = createValue(name, arrayHelpers.form.values);
        return (
          <Accordion
            key={name}
            collapsible
            type="single"
            className="array border rounded-md relative"
            id={name}
          >
            <AccordionItem value={name} className="border-0">
              <AccordionTrigger className={cn("pl-4", "pr-24")}>
                {normalizeName(name)}
              </AccordionTrigger>
              <AccordionContent className="pl-4 pr-2">
                {value ? (
                  value.map((_x: unknown, index: number) => {
                    return (
                      <AutoFormikObject
                        key={name + "." + index}
                        object={array.items}
                        name={name + "." + index}
                        form={form}
                        children={
                          <Button
                            type="button"
                            variant="secondary"
                            onClick={() => {
                              arrayHelpers.remove(index);
                            }}
                          >
                            Remove
                          </Button>
                        }
                      />
                    );
                  })
                ) : (
                  <AutoFormikObject
                    key={name}
                    object={array.items}
                    name={name}
                    form={form}
                  />
                )}
              </AccordionContent>
              <div className="absolute right-2 py-2 top-0 space-x-2" key={name}>
                <Button
                  type="button"
                  variant={"secondary"}
                  onClick={() => {
                    arrayHelpers.push(
                      initialsFromObject({ object: array.items }),
                    );
                  }}
                >
                  Add
                </Button>
                {/* {value.length > 0 && (
                  <Button
                    type="button"
                    variant={"secondary"}
                    onClick={() => {
                      arrayHelpers.pop();
                    }}
                  >
                    Remove
                  </Button>
                )} */}
              </div>
            </AccordionItem>
          </Accordion>
        );
      }}
    </FieldArray>
  );
}
