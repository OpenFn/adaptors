import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("Patient", () => {
    it("should create a simple Patient", () => {
        const resource = builders.patient({});
        assert.isOk(resource);
    });
});