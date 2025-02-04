import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("Goal", () => {
    it("should create a simple Goal", () => {
        const resource = builders.goal({});
        assert.isOk(resource);
    });
});