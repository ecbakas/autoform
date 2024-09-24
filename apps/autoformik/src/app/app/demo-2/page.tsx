"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import AutoFormik from "../../auto-formik";
import { $AutoFormikSchema, ValueType } from "../../auto-formik/types";
import { $UniRefund_CRMService_Merchants_CreateMerchantDto as TestSchema } from "./schema.ts";

export default function Page() {
  const [isSubmitting, setSubmitting] = useState(false);

  return (
    <div>
      <AutoFormik
        // defaultValues={{
        //   merchantId: "test@test.com",
        //   entityInformationTypes: {
        //     organizations: {
        //       name: "111",
        //       contactInformations: {
        //         telephones: {
        //           primaryFlag: true,
        //         },
        //       },
        //       // entityInformationTypes.organizations.contactInformations.telephones.primaryFlag
        //     },
        //     individuals: {
        //       contactInformations: {
        //         addresses: {
        //           addressLine: 55555,
        //         },
        //       },
        //     },
        //   },
        //   // addressId: "",
        // }}
        schema={TestSchema as $AutoFormikSchema}
        className="gap-2"
        onSubmit={(values: ValueType) => {
          setSubmitting(true);
          setSubmitting(false);
        }}
        isLoading={isSubmitting}
      >
        <Button
          type="submit"
          disabled={isSubmitting}
          className="sticky bottom-0"
        >
          Test
        </Button>
      </AutoFormik>
    </div>
  );
}
