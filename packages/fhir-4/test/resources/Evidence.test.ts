import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("Evidence", () => {
    it("should create a simple Evidence", () => {
        const resource = builders.evidence({});
        assert.isOk(resource);
    });
});