import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("ClinicalUseDefinition", () => {
    it("should create a simple ClinicalUseDefinition", () => {
        const resource = builders.clinicalUseDefinition({});
        assert.isOk(resource);
    });
});