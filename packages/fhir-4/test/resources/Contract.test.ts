import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("Contract", () => {
    it("should create a simple Contract", () => {
        const resource = builders.contract({});
        assert.isOk(resource);
    });
});