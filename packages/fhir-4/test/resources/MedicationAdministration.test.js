import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("MedicationAdministration", () => {
    it("should create a simple MedicationAdministration", () => {
        const resource = builders.medicationAdministration({});
        assert.isOk(resource);
    });
});