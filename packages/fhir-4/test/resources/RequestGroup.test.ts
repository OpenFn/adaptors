import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("RequestGroup", () => {
    it("should create a simple RequestGroup", () => {
        const resource = builders.requestGroup({});
        assert.isOk(resource);
    });
});