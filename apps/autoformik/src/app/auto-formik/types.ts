export type SchemaTypes =
  | "string"
  | "number"
  | "integer"
  | "object"
  | "array"
  | "boolean"
  | "null";

export interface $AutoFormikSchema {
  title?: string;
  description?: string;
  required?: string[];
  type: SchemaTypes;
  properties?: Record<string, PropertyType>;
  additionalProperties?: PropertyType | boolean | object;
}

export type PropertyType =
  | StringProperty
  | NumberProperty
  | ObjectProperty
  | ArrayProperty
  | BooleanProperty
  | NullProperty;

export interface BaseProperty {
  type:
    | "string"
    | "number"
    | "integer"
    | "object"
    | "array"
    | "boolean"
    | "null";
}
export interface StringProperty {
  type: "string";
  description?: string;
  format?:
    | "date"
    | "time"
    | "date-time"
    | "duration"
    | "regex"
    | "email"
    //   | "idn-email"
    //   | "hostname"
    //   | "idn-hostname"
    //   | "ipv4"
    //   | "ipv6"
    //   | "json-pointer"
    //   | "relative-json-pointer"
    | "uri"
    //   | "uri-reference"
    //   | "uri-template"
    //   | "iri"
    //   | "iri-reference"
    | "uuid";
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  //   contentEncoding?: "binary" | "base64" | "quoted-printable";
  //   contentMediaType?: string;
  //   contentSchema?: string;
  nullable?: boolean;
}
export interface NumberProperty {
  type: "number" | "integer";
  minimum?: number;
  maximum?: number;
  multipleOf?: number;
  exclusiveMinimum?: boolean;
  exclusiveMaximum?: boolean;
  enum: string[] | number[];
  format: "int32" | "int64" | "float" | "double";
}
export interface BooleanProperty {
  type: "boolean";
}
export interface NullProperty {
  type: "null";
}

export interface ObjectProperty {
  type: "object";
  properties?: Record<string, PropertyType>;
  required?: string[];
  additionalProperties?: PropertyType | boolean | object;
  nullable?: boolean;
  readOnly?: boolean;
}
export interface ArrayProperty {
  required?: string[];
  type: "array";
  items: ObjectProperty;
  nullable?: boolean;
}

// export interface Properties {
//   [key: string]: PropertyType;
// }
