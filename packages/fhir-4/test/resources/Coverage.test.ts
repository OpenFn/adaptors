import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("Coverage", () => {
    it("should create a simple Coverage", () => {
        const resource = builders.coverage({});
        assert.isOk(resource);
    });
});