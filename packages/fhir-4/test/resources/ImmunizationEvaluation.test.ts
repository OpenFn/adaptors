import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("ImmunizationEvaluation", () => {
    it("should create a simple ImmunizationEvaluation", () => {
        const resource = builders.immunizationEvaluation({});
        assert.isOk(resource);
    });
});