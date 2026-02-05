import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("SzCondition", () => {
    it("should create a simple SzCondition", () => {
        const resource = builders.condition("SzCondition", {});
        assert.isOk(resource);
    });
});