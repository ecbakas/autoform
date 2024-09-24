import { Ajv, DefinedError } from "ajv";
import addFormats from "ajv-formats";
import { ValueType } from ".";

export function validateBySchema({
  values,
  schema,
  resources,
}: {
  values: ValueType;
  schema: any;
  resources?: Record<string, string>;
}) {
  const ajv = new Ajv();
  addFormats(ajv);
  const validate = ajv.compile(schema);
  validate(values);
  const errors = validate.errors || [];
  const errorMessages: Record<string, string> = {};
  for (const err of errors as DefinedError[]) {
    switch (err.keyword) {
      case "format":
        Object.assign(errorMessages, {
          [err.instancePath.replace("/", "")]:
            `Invalid format. Must match "${humanReadableFormat(err.params.format)}"`,
        });
        // errorMessages.push({
        // [err.instancePath.replace("/", "")]:
        // `Invalid format. Must match "${err.params.format}"`,
        // });
        break;
    }
  }
  return { original: validate.errors, errors: errorMessages };
}

export function humanReadableFormat(format: string) {
  switch (format) {
    case "date-time":
      return "date-time";
    case "email":
      return "email";
    case "uuid":
      return "00000000-0000-0000-0000-000000000000";
    default:
      return "text";
  }
}
