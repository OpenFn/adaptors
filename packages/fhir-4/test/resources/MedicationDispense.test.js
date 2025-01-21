import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("MedicationDispense", () => {
    it("should create a simple MedicationDispense", () => {
        const resource = builders.medicationDispense({});
        assert.isOk(resource);
    });
});