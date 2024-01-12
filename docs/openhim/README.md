# Language OpenHIM

Language Pack for building expressions and operations for working with the
openhim API.

## [HL7 FHIR Standard](https://www.hl7.org/fhir/patient-example.json.html)

```json
{
  "resourceType": "Patient",
  "id": "example",
  "text": {
    "status": "generated",
    "div": "<div>\n      \n      <table>\n        \n        <tbody>\n          \n          <tr>\n            \n            <td>Name</td>\n            \n            <td>Peter James \n              <b>Chalmers</b> (&quot;Jim&quot;)\n            </td>\n          \n          </tr>\n          \n          <tr>\n            \n            <td>Address</td>\n            \n            <td>534 Erewhon, Pleasantville, Vic, 3999</td>\n          \n          </tr>\n          \n          <tr>\n            \n            <td>Contacts</td>\n            \n            <td>Home: unknown. Work: (03) 5555 6473</td>\n          \n          </tr>\n          \n          <tr>\n            \n            <td>Id</td>\n            \n            <td>MRN: 12345 (Acme Healthcare)</td>\n          \n          </tr>\n        \n        </tbody>\n      \n      </table>    \n    \n    </div>"
  },
  "identifier": [
    {
      "fhir_comments": ["   MRN assigned by ACME healthcare on 6-May 2001   "],
      "use": "usual",
      "type": {
        "coding": [
          {
            "system": "http://hl7.org/fhir/v2/0203",
            "code": "MR"
          }
        ]
      },
      "system": "urn:oid:1.2.36.146.595.217.0.1",
      "value": "12345",
      "period": {
        "start": "2001-05-06"
      },
      "assigner": {
        "display": "Acme Healthcare"
      }
    }
  ],
  "active": true,
  "name": [
    {
      "fhir_comments": ["   Peter James Chalmers, but called \"Jim\"   "],
      "use": "official",
      "family": ["Chalmers"],
      "given": ["Peter", "James"]
    },
    {
      "use": "usual",
      "given": ["Jim"]
    }
  ],
  "telecom": [
    {
      "fhir_comments": ["   home communication details aren't known   "],
      "use": "home"
    },
    {
      "system": "phone",
      "value": "(03) 5555 6473",
      "use": "work"
    }
  ],
  "gender": "male",
  "_gender": {
    "fhir_comments": ["   use FHIR code system for male / female   "]
  },
  "birthDate": "1974-12-25",
  "_birthDate": {
    "extension": [
      {
        "url": "http://hl7.org/fhir/StructureDefinition/patient-birthTime",
        "valueDateTime": "1974-12-25T14:35:45-05:00"
      }
    ]
  },
  "deceasedBoolean": false,
  "address": [
    {
      "use": "home",
      "type": "both",
      "line": ["534 Erewhon St"],
      "city": "PleasantVille",
      "district": "Rainbow",
      "state": "Vic",
      "postalCode": "3999",
      "period": {
        "start": "1974-12-25"
      }
    }
  ],
  "contact": [
    {
      "relationship": [
        {
          "coding": [
            {
              "system": "http://hl7.org/fhir/patient-contact-relationship",
              "code": "partner"
            }
          ]
        }
      ],
      "name": {
        "family": ["du", "MarchÃ©"],
        "_family": [
          {
            "extension": [
              {
                "fhir_comments": [
                  "   the \"du\" part is a family name prefix (VV in iso 21090)   "
                ],
                "url": "http://hl7.org/fhir/StructureDefinition/iso21090-EN-qualifier",
                "valueCode": "VV"
              }
            ]
          },
          null
        ],
        "given": ["BÃ©nÃ©dicte"]
      },
      "telecom": [
        {
          "system": "phone",
          "value": "+33 (237) 998327"
        }
      ],
      "gender": "female",
      "period": {
        "start": "2012",
        "_start": {
          "fhir_comments": ["   The contact relationship started in 2012   "]
        }
      }
    }
  ],
  "managingOrganization": {
    "reference": "Organization/1"
  }
}
```

### Configuration

View all the required and optional properties for `state.configuration` in the
official
[configuration-schema](https://docs.openfn.org/adaptors/packages/openhim-configuration-schema/)
definition.

## Development

Clone the [adaptors monorepo](https://github.com/OpenFn/adaptors). Follow the
`Getting Started` guide inside to get set up.

Run tests using `pnpm run test` or `pnpm run test:watch`

Build the project using `pnpm build`.

To just build the docs run `pnpm build docs`
