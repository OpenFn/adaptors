import { expect, assert } from "chai";
import { builders } from "../../src/index.js";

describe("Task", () => {
    it("should create a simple Task", () => {
        const resource = builders.task({});
        assert.isOk(resource);
    });
});

 describe("CodeableConcept properties", () => {
        it("should transform code array into proper CodeableConcept", () => {
            const resource = builders.task({
                code: ['BIRTH', 'http://opencrvs.org/specs/types'],
                status: 'completed'
            });

            expect(resource.code).to.deep.equal({
                coding: [
                    {
                        code: 'BIRTH',
                        system: 'http://opencrvs.org/specs/types'
                    }
                ]
            });
        });

        it("should preserve existing FHIR CodeableConcept objects", () => {
            const codeableConcept = {
                coding: [
                    {
                        code: 'custom-code',
                        system: 'http://custom.org/codes',
                        display: 'Custom Code'
                    }
                ],
                text: 'Custom code with display and text'
            };

            const resource = builders.task({
                code: codeableConcept,
                status: 'completed'
            });

            expect(resource.code).to.deep.equal(codeableConcept);
        });
    });