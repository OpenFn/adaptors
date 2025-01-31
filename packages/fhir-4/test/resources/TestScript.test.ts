import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("TestScript", () => {
    it("should create a simple TestScript", () => {
        const resource = builders.testScript({});
        assert.isOk(resource);
    });
});