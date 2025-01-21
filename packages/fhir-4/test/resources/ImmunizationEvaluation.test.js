import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("ImmunizationEvaluation", () => {
    it("should create a simple ImmunizationEvaluation", () => {
        const resource = builders.immunizationEvaluation({});
        assert.isOk(resource);
    });
});