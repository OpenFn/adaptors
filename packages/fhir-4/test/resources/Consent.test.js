import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("Consent", () => {
    it("should create a simple Consent", () => {
        const resource = builders.consent({});
        assert.isOk(resource);
    });
});