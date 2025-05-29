import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("Organization", () => {
    it("should create a simple Organization", () => {
        const resource = builders.organization({});
        assert.isOk(resource);
    });
});