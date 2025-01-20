import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("MedicationStatement", () => {
    it("should create a simple MedicationStatement", () => {
        const resource = builders.medicationStatement({});
        assert.isOk(resource);
    });
});