import { Ajv, DefinedError } from "ajv";
import addFormats from "ajv-formats";
import {
  ArrayProperty,
  ObjectProperty,
  SchemaTypes,
  Value,
  ValueType,
} from "./types";

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

export function createValue(name: string, param: any) {
  const temp = name.split(".");
  if (!param) return undefined;
  if (temp.length == 1) {
    return param[temp[0]];
  }
  return createValue(temp.slice(1).join("."), param[temp[0]]);
}
export function normalizeName(name: string) {
  // return name;

  const _name = name.split(".").at(-1);
  let returnName = _name;
  if (!returnName) return name;
  // remove is from the begining of the string if it exists
  if (returnName.startsWith("is")) {
    returnName = returnName.slice(2);
  }
  // seperate camelCase
  returnName = returnName.replace(/([A-Z])/g, " $1");
  // make first letter uppercase
  returnName = returnName.charAt(0).toUpperCase() + returnName.slice(1);
  return returnName;
}

export function initialsFromObject({
  name,
  object,
}: {
  name?: string;
  object: ObjectProperty;
}) {
  let _temp: Record<string, object> = {};
  if (name) _temp = { [name]: {} };

  Object.entries(object.properties || {}).forEach(([key, field]) => {
    if (key === "extraProperties") return;
    if (field.type === "object") {
      if (name)
        Object.assign(
          _temp[name],
          initialsFromObject({ name: key, object: field }),
        );
      else
        Object.assign(_temp, initialsFromObject({ name: key, object: field }));
    } else if (field.type === "array") {
      if (name)
        Object.assign(
          _temp[name],
          initialsFromArray({ name: key, array: field }),
        );
      else Object.assign(_temp, initialsFromArray({ name: key, array: field }));
    } else {
      if (name)
        Object.assign(_temp[name], { [key]: defaultsByType(field.type) });
      else Object.assign(_temp, { [key]: defaultsByType(field.type) });
    }
  });
  return _temp;
}
export function initialsFromArray({
  name,
  array,
}: {
  name: string;
  array: ArrayProperty;
}) {
  let _temp: Record<string, Array<Value>> = { [name]: [] };
  let _tempArray: Array<Record<string, Value>> = [];
  Object.entries(array.items?.properties || {}).forEach(([key, field]) => {
    if (key === "extraProperties") return;
    if (field.type === "object") {
      _tempArray.push(initialsFromObject({ name: key, object: field }));
    } else if (field.type === "array") {
      _tempArray.push(initialsFromArray({ name: key, array: field }));
    } else {
      _tempArray.push({ [key]: defaultsByType(field.type) });
    }
    // _temp[name] = _tempArray; neden açınca çalışmıyor anlamadım
  });
  return _temp;
}

function defaultsByType(type: SchemaTypes) {
  switch (type) {
    case "boolean":
      return false;
    case "number":
      return 0;
    case "string":
      return "";
    default:
      return "";
  }
}
