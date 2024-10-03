import { FieldErrorProps } from "@rjsf/utils";

export function FieldErrorTemplate(props: FieldErrorProps) {
  return (
    props.errors && (
      <ul className="space-y-1">
        {props.errors.map((error, key) => {
          return (
            <li
              key={error.toString() + key}
              className="text-destructive text-sm"
            >
              {error.toString()}
            </li>
          );
        })}
      </ul>
    )
  );
}
