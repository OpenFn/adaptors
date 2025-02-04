import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("Slot", () => {
    it("should create a simple Slot", () => {
        const resource = builders.slot({});
        assert.isOk(resource);
    });
});