import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("Resource", () => {
    it("should create a simple Resource", () => {
        const resource = builders.resource({});
        assert.isOk(resource);
    });
});