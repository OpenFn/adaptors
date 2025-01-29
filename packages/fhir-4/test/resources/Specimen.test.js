import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("Specimen", () => {
    it("should create a simple Specimen", () => {
        const resource = builders.specimen({});
        assert.isOk(resource);
    });
});