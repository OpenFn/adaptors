import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("MedicinalProductDefinition", () => {
    it("should create a simple MedicinalProductDefinition", () => {
        const resource = builders.medicinalProductDefinition({});
        assert.isOk(resource);
    });
});