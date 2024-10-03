import { GenericObjectType, UiSchema } from "@rjsf/utils";
import { PhoneNumberUtil } from "google-libphonenumber";

export const isPhoneValid = (phone: string) => {
  try {
    const phoneUtil = PhoneNumberUtil.getInstance();
    const phoneNumber = phoneUtil.parseAndKeepRawInput(phone);

    return phoneUtil.isValidNumber(phoneNumber);
  } catch (error) {
    return false;
  }
};
export const splitPhone = (phone: string) => {
  const phoneUtil = PhoneNumberUtil.getInstance();
  const phoneNumber = phoneUtil.parseAndKeepRawInput(phone);
  const format = phoneUtil
    .formatOutOfCountryCallingNumber(phoneNumber)
    .split("+")[1];
  const ituCountryCode = format.split(" ")[0];
  const phoneNumberWithoutCountryCode = format.substring(
    ituCountryCode.length + 1,
  );
  const areaCode = phoneNumberWithoutCountryCode.includes("-")
    ? phoneNumberWithoutCountryCode.split("-")[0]
    : phoneNumberWithoutCountryCode.split(" ")[0];

  const phoneData = {
    ituCountryCode,
    areaCode,
    localNumber: phoneNumberWithoutCountryCode
      .substring(areaCode.length + 1)
      .replaceAll(" ", "")
      .replaceAll("-", ""),
  };
  return phoneData;
};

/**
 * Transforms a generic schema by removing specified fields and adding a new field.
 *
 * @param {GenericObjectType} inputSchema - The schema to be transformed.
 * @param {string[]} fieldsToRemove - The fields to be removed from the schema.
 * @param {string} newFieldName - The name of the new field to be added.
 * @param {string[]} requiredFields - The fields that are required in the new object.
 * @returns {GenericObjectType} - The transformed schema.
 */
export function transformGenericSchema(
  inputSchema: GenericObjectType,
  fieldsToRemove: string[],
  newFieldName: string,
  requiredFields: string[], // New parameter for required fields
): GenericObjectType {
  if (inputSchema.type === "object" && inputSchema.properties) {
    const schemaProperties = inputSchema.properties;

    // Check fields
    for (const propertyKey in schemaProperties) {
      if (schemaProperties[propertyKey].type === "object") {
        schemaProperties[propertyKey] = transformGenericSchema(
          schemaProperties[propertyKey],
          fieldsToRemove,
          newFieldName,
          requiredFields,
        );
      } else if (
        schemaProperties[propertyKey].type === "array" &&
        schemaProperties[propertyKey].items
      ) {
        schemaProperties[propertyKey].items = transformGenericSchema(
          schemaProperties[propertyKey].items,
          fieldsToRemove,
          newFieldName,
          requiredFields,
        );
      }
    }

    // Check for transformation
    const shouldTransform = fieldsToRemove.every(
      (field) => field in schemaProperties,
    );

    if (shouldTransform) {
      // Do not transform if newFieldName already exists
      if (!(newFieldName in schemaProperties)) {
        // Update required fields if necessary
        inputSchema.required = inputSchema.required.filter(
          (requiredItem: string) => !fieldsToRemove.includes(requiredItem),
        );

        // Create the new field by copying properties from the original schema
        const newFieldProperties = {
          type: "object",
          required: requiredFields, // Use the generic required fields
          properties: requiredFields.reduce((acc, field) => {
            acc[field] = schemaProperties[field]; // Copy from original properties
            return acc;
          }, {} as GenericObjectType),
        };

        // Assign the new field properties
        inputSchema.properties[newFieldName] = newFieldProperties;

        // Remove specified fields
        fieldsToRemove.forEach((field) => {
          delete schemaProperties[field];
        });
      }
    }
  }

  return inputSchema; // Return the transformed schema
}

/**
 * Flattens the given data by extracting specified fields from a nested object.
 *
 * @param {GenericObjectType} inputData - The initial data to be transformed.
 * @param {string} targetKey - The name of the key to be transformed.
 * @param {string[]} fieldsToExtract - The fields to be extracted from the flattened object.
 * @returns {GenericObjectType} - The transformed object.
 */
export function flattenGenericData(
  inputData: GenericObjectType,
  targetKey: string,
  fieldsToExtract: string[],
): GenericObjectType {
  const transformObject = (obj: GenericObjectType): GenericObjectType => {
    if (Array.isArray(obj)) {
      return obj.map(transformObject); // Apply transformation for arrays
    }

    const transformedObject: GenericObjectType = { ...obj }; // Create a copy of the original object

    for (const key in transformedObject) {
      if (transformedObject.hasOwnProperty(key)) {
        // Is the key valid?
        if (key === targetKey && typeof transformedObject[key] === "object") {
          // Extract specified fields
          const extractedFields = fieldsToExtract.reduce(
            (accumulator, field) => {
              if (transformedObject[key][field] !== undefined) {
                accumulator[field] = transformedObject[key][field];
              }
              return accumulator;
            },
            {} as GenericObjectType,
          );

          // Create the new object
          Object.assign(transformedObject, extractedFields);
          delete transformedObject[key]; // Remove the old key
          return transformedObject; // Return the transformed object
        }

        // If the value is an object, apply recursive transformation
        if (
          typeof transformedObject[key] === "object" &&
          transformedObject[key] !== null
        ) {
          transformedObject[key] = transformObject(transformedObject[key]);
        }
      }
    }
    return transformedObject; // Return the transformed object
  };

  return transformObject(inputData); // Pass the initial data to the transformation function
}

export function generateUiSchema<T extends GenericObjectType>(
  schema: T,
  key: string,
  prop: Record<string, any>,
): Record<string, any> {
  const result: Record<string, any> = {};

  const traverse = (obj: T, res: Record<string, any>) => {
    for (const k in obj) {
      if (k === key) {
        res[k] = { ...prop };
      } else if (typeof obj[k] === "object" && obj[k] !== null) {
        if (obj[k].items) {
          res[k] = {
            items: {},
          };
          traverse(obj[k].items as T, res[k].items);
        } else {
          traverse(obj[k] as T, res); // Sadece iç yapıları kontrol et
        }
      }
    }
  };

  traverse(schema, result);
  return result;
}

/**
 * Checks if the given value is an object.
 * @param value - The value to check.
 * @returns True if the value is an object; otherwise, false.
 */
export function isObject(value: any): value is GenericObjectType {
  return value && typeof value === "object" && !Array.isArray(value);
}

/**
 * Merges two UISchema objects recursively.
 * @param source - The first UISchema object to merge.
 * @param target - The second UISchema object to merge.
 * @returns A new merged UISchema object.
 */
export function mergeUISchemaObjects<T extends UiSchema, U extends UiSchema>(
  source: T,
  target: U,
): T & U {
  const mergedResult: UiSchema = { ...source }; // Copy the source UISchema object

  for (const key in target) {
    if (target.hasOwnProperty(key)) {
      // If both keys are objects, merge them recursively
      if (isObject(mergedResult[key]) && isObject(target[key])) {
        mergedResult[key] = mergeUISchemaObjects(
          mergedResult[key],
          target[key],
        );
      } else {
        // If there is no conflict or the value is not an object, take the value from the target
        mergedResult[key] = target[key];
      }
    }
  }

  return mergedResult as T & U; // Return the merged result
}
