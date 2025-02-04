import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("Condition", () => {
    it("should create a simple Condition", () => {
        const resource = builders.condition({});
        assert.isOk(resource);
    });
});