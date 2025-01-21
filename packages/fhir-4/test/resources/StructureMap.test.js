import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("StructureMap", () => {
    it("should create a simple StructureMap", () => {
        const resource = builders.structureMap({});
        assert.isOk(resource);
    });
});