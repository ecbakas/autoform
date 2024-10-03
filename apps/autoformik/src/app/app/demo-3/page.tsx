"use client";
import { useEffect, useState } from "react";
import SchemaForm from "../schema-form";
import { $UniRefund_CRMService_Merchants_MerchantDetailDto as XX } from "../../auto-formik/test";
export default function Page() {
  const cities = [
    {
      country: "abd",
      label: "New york",
      value: "new",
    },
    {
      country: "abd",
      label: "Washington",
      value: "was",
    },
    {
      country: "tr",
      label: "Istanbul",
      value: "ist",
    },
    {
      country: "tr",
      label: "Konya",
      value: "kny",
    },
    {
      country: "en",
      label: "London",
      value: "lon",
    },
    {
      country: "fr",
      label: "Paris",
      value: "par",
    },
  ];
  const cities2 = [
    {
      country: "abd",
      label: "New york",
      value: "new",
    },
    {
      country: "abd",
      label: "Washington",
      value: "was",
    },
    {
      country: "tr",
      label: "Istanbul",
      value: "ist",
    },
  ];

  const [cityOptions, setCityOptions] = useState<Array<Record<string, string>>>(
    [],
  );
  const [countryOptions] = useState([
    {
      label: "Turkey",
      value: "tr",
    },
    {
      label: "America",
      value: "abd",
    },
    {
      label: "England",
      value: "en",
    },
    {
      label: "France",
      value: "fr",
    },
  ]);

  const x = {
    type: "object",
    properties: {
      first: {
        type: "string",
      },
      country: {
        type: "string",
      },
      city: {
        type: "string",
      },
      second: {
        type: "string",
      },
      test: {
        enum: [
          {
            name: "New York",
            lat: 40,
            lon: 74,
          },
          {
            name: "Amsterdam",
            lat: 52,
            lon: 5,
          },
          {
            name: "Hong Kong",
            lat: 22,
            lon: 114,
          },
        ],
      },
      fullAddress: {
        type: "string",
        nullable: true,
      },
      typeCode: {
        enum: [0, 1],
        type: "integer",
        format: "int32",
      },
      primaryFlag: {
        type: "boolean",
      },
      contactInformationTypeId: {
        type: "string",
        format: "uuid",
      },
    },
    additionalProperties: false,
  };

  return (
    <div>
      <SchemaForm
        schema={x}
        usePhoneField
        uiSchema={{
          test: {
            "ui:enumNames": x.properties.test.enum.map((x) => x.name),
          },
          country: {
            "ui:widget": "async-select",
            enum: countryOptions,
            onChange: (e: string) => {
              setCityOptions(cities.filter((x) => x.country === e) || []);
            },
          },
          city: {
            "ui:widget": "async-select",
            enum: cityOptions,
            onChange: (e: string) => {
              console.log("changed");
            },
          },
        }}
        onSubmit={(data) => console.log(data.formData)}
        onChange={(data) => {
          console.log(data);
        }}
      />
    </div>
  );
}
