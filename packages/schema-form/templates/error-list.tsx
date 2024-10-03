import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { ErrorListProps } from "@rjsf/utils";

export function ErrorListTemplate(props: ErrorListProps) {
  const { errors } = props;
  return (
    <ul className="space-y-2">
      {errors.map((error) => (
        <li key={error.stack}>
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error.stack}</AlertDescription>
          </Alert>
        </li>
      ))}
    </ul>
  );
}
