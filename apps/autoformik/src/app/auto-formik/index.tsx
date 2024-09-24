import { cn } from "@/lib/utils";
import {
  FieldArray,
  Form,
  Formik,
  FormikErrors,
  FormikHandlers,
  FormikHelpers,
  FormikTouched,
} from "formik";
import Field, { createValue, IFieldProps, normalizeName } from "./fields/field";
import {
  $AutoFormikSchema,
  ArrayProperty,
  ObjectProperty,
  PropertyType,
} from "./types";
import { validateBySchema } from "./utils";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Schema } from "ajv";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export type Test =
  | number
  | string
  | boolean
  | null
  | undefined
  | object
  | Array<ValueType>;
export type ValueType = Record<string, Test>;
export interface IAutoFormikProps {
  className?: string;
  onSubmit: (values: ValueType) => void;
  validateOverride?: (values: ValueType) => Record<string, string> | {};
  defaultValues?: ValueType;
  children: JSX.Element;
  isLoading?: boolean;
  schema: $AutoFormikSchema;
}
export type FormikFormType = {
  values: ValueType;
  errors: FormikErrors<ValueType>;
  touched: FormikTouched<ValueType>;
  handleChange: FormikHandlers["handleChange"];
  handleBlur: FormikHandlers["handleBlur"];
  disabled: boolean;
};
export default function AutoFormik({
  className,
  onSubmit,
  validateOverride = () => {
    return {};
  },
  defaultValues,
  children,
  isLoading = false,
  schema,
}: IAutoFormikProps) {
  return (
    <Formik
      initialValues={
        defaultValues || fromObject({ object: schema as ObjectProperty })
      }
      validate={(values) => {
        const { errors } = validateBySchema({
          values: values,
          schema: schema,
        });
        return errors && validateOverride(values);
      }}
      onSubmit={(
        values: ValueType,
        { setSubmitting }: FormikHelpers<ValueType>,
      ) => {
        if (
          validateOverride(values) &&
          validateBySchema({ values: values, schema: schema })
        ) {
          console.log("can submit", values);
          onSubmit(values);
        }
        setSubmitting(false);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        isSubmitting,
      }) => {
        return (
          <Form className={cn("", className)}>
            <FieldsFromObject
              object={schema}
              form={{
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                disabled: isSubmitting || isLoading,
              }}
            />
            {children}
          </Form>
        );
      }}
    </Formik>
  );
}

export function FieldsFromObject({
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
    <div className={cn("object space-y-2")} id={name}>
      {Object.keys(object.properties).map((key: string): JSX.Element => {
        const field =
          object.properties?.[key as keyof typeof object.properties];
        const fullName = name ? name + "." + key : key;
        if (!field) return <></>;
        if (field.type === "object") {
          return (
            <FieldsFromObject
              key={fullName}
              object={field}
              name={fullName}
              form={form}
            />
          );
        }
        if (field.type === "array") {
          return (
            <FieldsFromArray
              key={fullName}
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
      })}
      {children}
    </div>
  );
}

export function FieldsFromArray({
  array,
  name,
  form,
}: {
  array: ArrayProperty; // Record<string, PropertyType>;
  name: string;
  form: FormikFormType;
}): JSX.Element | JSX.Element[] {
  return (
    <FieldArray name={name}>
      {(arrayHelpers) => {
        const value = createValue(name, arrayHelpers.form.values);
        console.log(value);
        return (
          <Accordion
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
                      <>
                        <FieldsFromObject
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
                      </>
                    );
                  })
                ) : (
                  <FieldsFromObject
                    key={name}
                    object={array.items}
                    name={name}
                    form={form}
                  />
                )}
              </AccordionContent>
              <div className="absolute right-2 py-2 top-0 space-x-2">
                <Button
                  type="button"
                  variant={"secondary"}
                  onClick={() => {
                    arrayHelpers.push(fromObject({ object: array.items }));
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

function fromObject({
  name,
  object,
}: {
  name?: string;
  object: ObjectProperty;
}) {
  let _temp: Record<string, any> = {};
  if (name) _temp = { [name]: {} };

  Object.entries(object.properties || {}).forEach(([key, field]) => {
    if (key === "extraProperties") return;
    if (field.type === "object") {
      if (name)
        Object.assign(_temp[name], fromObject({ name: key, object: field }));
      else Object.assign(_temp, fromObject({ name: key, object: field }));
    } else if (field.type === "array") {
      if (name)
        Object.assign(_temp[name], fromArray({ name: key, array: field }));
      else Object.assign(_temp, fromArray({ name: key, array: field }));
    } else {
      if (name) Object.assign(_temp[name], { [key]: "1" });
      else Object.assign(_temp, { [key]: "1" });
    }
  });
  return _temp;
}
function fromArray({ name, array }: { name: string; array: ArrayProperty }) {
  let _temp: Record<string, Array<any>> = { [name]: [] };
  let _tempArray: Array<Record<string, Test>> = [];
  Object.entries(array.items?.properties || {}).forEach(([key, field]) => {
    if (key === "extraProperties") return;
    if (field.type === "object") {
      _tempArray.push(fromObject({ name: key, object: field }));
    } else if (field.type === "array") {
      _tempArray.push(fromArray({ name: key, array: field }));
    } else {
      _tempArray.push({ [key]: "1" });
    }
    // _temp[name] = _tempArray; neden açınca çalışmıyor anlamadım
  });
  return _temp;
}
