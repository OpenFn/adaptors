import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("Measure", () => {
    it("should create a simple Measure", () => {
        const resource = builders.measure({});
        assert.isOk(resource);
    });
});