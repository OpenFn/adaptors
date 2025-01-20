import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("StructureDefinition", () => {
    it("should create a simple StructureDefinition", () => {
        const resource = builders.structureDefinition({});
        assert.isOk(resource);
    });
});