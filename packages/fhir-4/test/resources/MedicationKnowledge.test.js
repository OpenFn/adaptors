import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("MedicationKnowledge", () => {
    it("should create a simple MedicationKnowledge", () => {
        const resource = builders.medicationKnowledge({});
        assert.isOk(resource);
    });
});