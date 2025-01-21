import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("Provenance", () => {
    it("should create a simple Provenance", () => {
        const resource = builders.provenance({});
        assert.isOk(resource);
    });
});