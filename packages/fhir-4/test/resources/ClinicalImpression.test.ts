import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("ClinicalImpression", () => {
    it("should create a simple ClinicalImpression", () => {
        const resource = builders.clinicalImpression({});
        assert.isOk(resource);
    });
});