import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("Medication", () => {
    it("should create a simple Medication", () => {
        const resource = builders.medication({});
        assert.isOk(resource);
    });
});