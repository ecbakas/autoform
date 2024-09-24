"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Formik } from "formik";
export default function Page() {
  return (
    <div>
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={(values) => {
          const errors = {
            email: "",
            password: "",
          };
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,

          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit} className="max-w-xl space-y-2">
            <Input
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            {errors.email && touched.email && errors.email}
            <Input
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            {errors.password && touched.password && errors.password}
            <Button disabled={isSubmitting}>Submit</Button>
          </form>
        )}
      </Formik>
    </div>
  );
}
