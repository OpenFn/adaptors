import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("Encounter", () => {
    it("should create a simple Encounter", () => {
        const resource = builders.encounter({});
        assert.isOk(resource);
    });
});