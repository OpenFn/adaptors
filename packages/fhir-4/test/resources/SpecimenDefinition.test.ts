import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("SpecimenDefinition", () => {
    it("should create a simple SpecimenDefinition", () => {
        const resource = builders.specimenDefinition({});
        assert.isOk(resource);
    });
});