export const $UniRefund_CRMService_Merchants_CreateMerchantDto = {
  required: ["entityInformationTypes"],
  type: "object",
  properties: {
    extraProperties: {
      type: "object",
      additionalProperties: {},
      nullable: true,
      readOnly: true,
    },
    entityInformationTypes: {
      type: "array",
      items: {
        type: "object",
        properties: {
          extraProperties: {
            type: "object",
            additionalProperties: {},
            nullable: true,
            readOnly: true,
          },
          organizations: {
            type: "array",
            items: {
              required: ["legalStatusCode", "name", "taxpayerId"],
              type: "object",
              properties: {
                extraProperties: {
                  type: "object",
                  additionalProperties: {},
                  nullable: true,
                  readOnly: true,
                },
                name: {
                  maxLength: 255,
                  minLength: 0,
                  type: "string",
                },
                taxpayerId: {
                  maxLength: 255,
                  minLength: 0,
                  type: "string",
                },
                legalStatusCode: {
                  maxLength: 255,
                  minLength: 0,
                  type: "string",
                },
                customerNumber: {
                  type: "string",
                  nullable: true,
                },
                branchId: {
                  type: "string",
                  nullable: true,
                },
                parentCompanyId: {
                  type: "string",
                  format: "uuid",
                  nullable: true,
                },
                contactInformations: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      extraProperties: {
                        type: "object",
                        additionalProperties: {},
                        nullable: true,
                        readOnly: true,
                      },
                      telephones: {
                        type: "array",
                        items: {
                          required: [
                            "areaCode",
                            "ituCountryCode",
                            "localNumber",
                            "primaryFlag",
                            "typeCode",
                          ],
                          type: "object",
                          properties: {
                            extraProperties: {
                              type: "object",
                              additionalProperties: {},
                              nullable: true,
                              readOnly: true,
                            },
                            areaCode: {
                              maxLength: 255,
                              minLength: 0,
                              type: "string",
                            },
                            localNumber: {
                              maxLength: 255,
                              minLength: 0,
                              type: "string",
                            },
                            ituCountryCode: {
                              maxLength: 255,
                              minLength: 0,
                              type: "string",
                            },
                            primaryFlag: {
                              type: "boolean",
                            },
                            typeCode: {
                              enum: [0, 1, 2, 3],
                              type: "integer",
                              format: "int32",
                            },
                          },
                          additionalProperties: false,
                        },
                        nullable: true,
                      },
                      addresses: {
                        type: "array",
                        items: {
                          required: [
                            "addressLine",
                            "city",
                            "country",
                            "fullAddress",
                            "postalCode",
                            "primaryFlag",
                            "terriority",
                            "typeCode",
                          ],
                          type: "object",
                          properties: {
                            extraProperties: {
                              type: "object",
                              additionalProperties: {},
                              nullable: true,
                              readOnly: true,
                            },
                            addressLine: {
                              maxLength: 255,
                              minLength: 0,
                              type: "string",
                            },
                            city: {
                              maxLength: 255,
                              minLength: 0,
                              type: "string",
                            },
                            terriority: {
                              maxLength: 255,
                              minLength: 0,
                              type: "string",
                            },
                            postalCode: {
                              maxLength: 255,
                              minLength: 0,
                              type: "string",
                            },
                            country: {
                              maxLength: 255,
                              minLength: 0,
                              type: "string",
                            },
                            fullAddress: {
                              maxLength: 255,
                              minLength: 0,
                              type: "string",
                            },
                            primaryFlag: {
                              type: "boolean",
                            },
                            typeCode: {
                              enum: [0, 1],
                              type: "integer",
                              format: "int32",
                            },
                          },
                          additionalProperties: false,
                        },
                        nullable: true,
                      },
                      emails: {
                        type: "array",
                        items: {
                          required: ["emailAddress", "primaryFlag", "typeCode"],
                          type: "object",
                          properties: {
                            extraProperties: {
                              type: "object",
                              additionalProperties: {},
                              nullable: true,
                              readOnly: true,
                            },
                            emailAddress: {
                              maxLength: 255,
                              minLength: 0,
                              type: "string",
                            },
                            primaryFlag: {
                              type: "boolean",
                            },
                            typeCode: {
                              enum: [0, 1],
                              type: "integer",
                              format: "int32",
                            },
                          },
                          additionalProperties: false,
                        },
                        nullable: true,
                      },
                    },
                    additionalProperties: false,
                  },
                  nullable: true,
                },
              },
              additionalProperties: false,
            },
            nullable: true,
          },
          individuals: {
            type: "array",
            items: {
              type: "object",
              properties: {
                extraProperties: {
                  type: "object",
                  additionalProperties: {},
                  nullable: true,
                  readOnly: true,
                },
                name: {
                  required: [
                    "mailingName",
                    "name",
                    "officialName",
                    "salutation",
                    "suffix",
                  ],
                  type: "object",
                  properties: {
                    salutation: {
                      maxLength: 255,
                      minLength: 0,
                      type: "string",
                    },
                    name: {
                      maxLength: 255,
                      minLength: 0,
                      type: "string",
                    },
                    suffix: {
                      maxLength: 255,
                      minLength: 0,
                      type: "string",
                    },
                    mailingName: {
                      maxLength: 255,
                      minLength: 0,
                      type: "string",
                    },
                    officialName: {
                      maxLength: 255,
                      minLength: 0,
                      type: "string",
                    },
                  },
                  additionalProperties: false,
                },
                personalSummaries: {
                  type: "array",
                  items: {
                    required: [
                      "birthDate",
                      "date",
                      "ethnicity",
                      "genderTypeCode",
                      "maritalStatusCode",
                      "religiousAffiliationName",
                    ],
                    type: "object",
                    properties: {
                      extraProperties: {
                        type: "object",
                        additionalProperties: {},
                        nullable: true,
                        readOnly: true,
                      },
                      date: {
                        type: "string",
                        format: "date-time",
                      },
                      birthDate: {
                        type: "string",
                        format: "date-time",
                      },
                      ethnicity: {
                        maxLength: 255,
                        minLength: 0,
                        type: "string",
                      },
                      maritalStatusCode: {
                        maxLength: 255,
                        minLength: 0,
                        type: "string",
                      },
                      religiousAffiliationName: {
                        maxLength: 255,
                        minLength: 0,
                        type: "string",
                      },
                      genderTypeCode: {
                        enum: [0, 1],
                        type: "integer",
                        format: "int32",
                      },
                    },
                    additionalProperties: false,
                  },
                  nullable: true,
                },
                contactInformations: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      extraProperties: {
                        type: "object",
                        additionalProperties: {},
                        nullable: true,
                        readOnly: true,
                      },
                      telephones: {
                        type: "array",
                        items: {
                          required: [
                            "areaCode",
                            "ituCountryCode",
                            "localNumber",
                            "primaryFlag",
                            "typeCode",
                          ],
                          type: "object",
                          properties: {
                            extraProperties: {
                              type: "object",
                              additionalProperties: {},
                              nullable: true,
                              readOnly: true,
                            },
                            areaCode: {
                              maxLength: 255,
                              minLength: 0,
                              type: "string",
                            },
                            localNumber: {
                              maxLength: 255,
                              minLength: 0,
                              type: "string",
                            },
                            ituCountryCode: {
                              maxLength: 255,
                              minLength: 0,
                              type: "string",
                            },
                            primaryFlag: {
                              type: "boolean",
                            },
                            typeCode: {
                              enum: [0, 1, 2, 3],
                              type: "integer",
                              format: "int32",
                            },
                          },
                          additionalProperties: false,
                        },
                        nullable: true,
                      },
                      addresses: {
                        type: "array",
                        items: {
                          required: [
                            "addressLine",
                            "city",
                            "country",
                            "fullAddress",
                            "postalCode",
                            "primaryFlag",
                            "terriority",
                            "typeCode",
                          ],
                          type: "object",
                          properties: {
                            extraProperties: {
                              type: "object",
                              additionalProperties: {},
                              nullable: true,
                              readOnly: true,
                            },
                            addressLine: {
                              maxLength: 255,
                              minLength: 0,
                              type: "string",
                            },
                            city: {
                              maxLength: 255,
                              minLength: 0,
                              type: "string",
                            },
                            terriority: {
                              maxLength: 255,
                              minLength: 0,
                              type: "string",
                            },
                            postalCode: {
                              maxLength: 255,
                              minLength: 0,
                              type: "string",
                            },
                            country: {
                              maxLength: 255,
                              minLength: 0,
                              type: "string",
                            },
                            fullAddress: {
                              maxLength: 255,
                              minLength: 0,
                              type: "string",
                            },
                            primaryFlag: {
                              type: "boolean",
                            },
                            typeCode: {
                              enum: [0, 1],
                              type: "integer",
                              format: "int32",
                            },
                          },
                          additionalProperties: false,
                        },
                        nullable: true,
                      },
                      emails: {
                        type: "array",
                        items: {
                          required: ["emailAddress", "primaryFlag", "typeCode"],
                          type: "object",
                          properties: {
                            extraProperties: {
                              type: "object",
                              additionalProperties: {},
                              nullable: true,
                              readOnly: true,
                            },
                            emailAddress: {
                              maxLength: 255,
                              minLength: 0,
                              type: "string",
                            },
                            primaryFlag: {
                              type: "boolean",
                            },
                            typeCode: {
                              enum: [0, 1],
                              type: "integer",
                              format: "int32",
                            },
                          },
                          additionalProperties: false,
                        },
                        nullable: true,
                      },
                    },
                    additionalProperties: false,
                  },
                  nullable: true,
                },
              },
              additionalProperties: false,
            },
            nullable: true,
          },
        },
        additionalProperties: false,
      },
    },
  },
  additionalProperties: false,
};

export const $UniRefund_CRMService_Merchants_CreateMerchantDtoX = {
  type: "object",
  properties: {
    extraProperties: {
      type: "object",
      additionalProperties: {},
      nullable: true,
      readOnly: true,
    },
    users: {
      type: "array",
      items: {
        type: "object",
        properties: {
          user: {
            type: "object",
            properties: {
              username: {
                maxLength: 255,
                minLength: 0,
                type: "string",
              },
              password: {
                maxLength: 255,
                minLength: 0,
                type: "string",
              },
            },
            additionalProperties: false,
          },
          userType: {
            maxLength: 255,
            minLength: 0,
            type: "string",
          },
        },
        additionalProperties: false,
      },
    },
  },
  additionalProperties: false,
};
