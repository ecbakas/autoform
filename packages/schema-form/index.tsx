import Form, { FormProps, ThemeProps } from "@rjsf/core";
import { GenericObjectType, RJSFSchema } from "@rjsf/utils";
import validator from "@rjsf/validator-ajv8";
import { AsyncSelect } from "./fields/async-select";
import { CustomCheckbox } from "./fields/checkbox";
import { CustomDate } from "./fields/date";
import { FieldErrorTemplate } from "./fields/error";
import { CustomPhoneField } from "./fields/phone";
import { CustomSelect } from "./fields/select";
import { CustomTextInput } from "./fields/text";
import { AccordionArrayFieldTemplate } from "./templates/array";
import { ErrorListTemplate } from "./templates/error-list";
import { FieldTemplate } from "./templates/field";
import { ObjectFieldTemplate } from "./templates/object";
import {
  flattenGenericData,
  generateUiSchema,
  mergeUISchemaObjects,
  transformGenericSchema,
} from "./utils";

const ShadcnTheme: ThemeProps = {
  fields: {
    phone: CustomPhoneField,
  },
  widgets: {
    CheckboxWidget: CustomCheckbox,
    SelectWidget: CustomSelect,
    "async-select": AsyncSelect,
    TextWidget: CustomTextInput,
    DateTimeWidget: CustomDate,
  },
  templates: {
    ArrayFieldTemplate: AccordionArrayFieldTemplate,
    ErrorListTemplate: ErrorListTemplate,
    FieldErrorTemplate: FieldErrorTemplate,
    FieldTemplate: FieldTemplate,
    ObjectFieldTemplate: ObjectFieldTemplate,
  },
};
export interface SchemaFormProps extends Omit<FormProps, "validator"> {
  schema: GenericObjectType;
  usePhoneField?: boolean;
}
export default function SchemaForm({ ...props }: SchemaFormProps) {
  var uiSchema = {};
  let schema = props.schema;
  if (props.usePhoneField) {
    schema = transformGenericSchema(
      props.schema,
      ["areaCode", "ituCountryCode", "localNumber"],
      "phone",
      ["areaCode", "ituCountryCode", "localNumber"],
    );
    uiSchema = generateUiSchema(schema, "phone", {
      "ui:field": "phone",
    });
  }
  if (props.uiSchema) {
    uiSchema = mergeUISchemaObjects(uiSchema, props.uiSchema);
  }

  return (
    <Form
      noHtml5Validate
      liveValidate
      focusOnFirstError
      showErrorList={props.showErrorList || false}
      {...props}
      schema={schema as RJSFSchema}
      validator={validator}
      fields={{ ...ShadcnTheme.fields, ...props.fields }}
      widgets={{ ...ShadcnTheme.widgets, ...props.widgets }}
      templates={{ ...ShadcnTheme.templates, ...props.templates }}
      uiSchema={uiSchema}
      onChange={(e) => {
        if (props.usePhoneField) {
          e.formData = flattenGenericData(e.formData, "phone", [
            "areaCode",
            "ituCountryCode",
            "localNumber",
          ]);
        }
        if (props.onChange) props.onChange(e);
      }}
      onSubmit={(data, event) => {
        if (props.usePhoneField) {
          data.formData = flattenGenericData(data.formData, "phone", [
            "areaCode",
            "ituCountryCode",
            "localNumber",
          ]);
        }
        if (props.onSubmit) props.onSubmit(data, event);
      }}
    />
  );
}
