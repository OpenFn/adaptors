import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("Device", () => {
    it("should create a simple Device", () => {
        const resource = builders.device({});
        assert.isOk(resource);
    });
});