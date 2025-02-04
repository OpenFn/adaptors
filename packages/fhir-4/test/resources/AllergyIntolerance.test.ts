import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("AllergyIntolerance", () => {
    it("should create a simple AllergyIntolerance", () => {
        const resource = builders.allergyIntolerance({});
        assert.isOk(resource);
    });
});