import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("Substance", () => {
    it("should create a simple Substance", () => {
        const resource = builders.substance({});
        assert.isOk(resource);
    });
});