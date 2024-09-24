import { cn } from "@/lib/utils";
import {
  Form,
  Formik,
  FormikErrors,
  FormikHandlers,
  FormikHelpers,
  FormikTouched,
} from "formik";
import Field, { IFieldProps } from "./fields/field";
import {
  $AutoFormikSchema,
  ArrayProperty,
  ObjectProperty,
  ValueType,
} from "./types";
import { initialsFromObject, validateBySchema } from "./utils";
import { AutoFormikObject } from "./fields/object";

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
        defaultValues ||
        initialsFromObject({ object: schema as ObjectProperty })
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
            <AutoFormikObject
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
