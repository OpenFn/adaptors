import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("MedicationRequest", () => {
    it("should create a simple MedicationRequest", () => {
        const resource = builders.medicationRequest({});
        assert.isOk(resource);
    });
});