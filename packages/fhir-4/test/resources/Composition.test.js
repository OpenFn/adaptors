import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("Composition", () => {
    it("should create a simple Composition", () => {
        const resource = builders.composition({});
        assert.isOk(resource);
    });
});