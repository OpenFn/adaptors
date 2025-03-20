import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("Flag", () => {
    it("should create a simple Flag", () => {
        const resource = builders.flag({});
        assert.isOk(resource);
    });
});