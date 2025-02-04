import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("Group", () => {
    it("should create a simple Group", () => {
        const resource = builders.group({});
        assert.isOk(resource);
    });
});