import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("SpecimenDefinition", () => {
    it("should create a simple SpecimenDefinition", () => {
        const resource = builders.specimenDefinition({});
        assert.isOk(resource);
    });
});