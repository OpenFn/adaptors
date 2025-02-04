import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("Schedule", () => {
    it("should create a simple Schedule", () => {
        const resource = builders.schedule({});
        assert.isOk(resource);
    });
});