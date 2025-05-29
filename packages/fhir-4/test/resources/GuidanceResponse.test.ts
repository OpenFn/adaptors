import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("GuidanceResponse", () => {
    it("should create a simple GuidanceResponse", () => {
        const resource = builders.guidanceResponse({});
        assert.isOk(resource);
    });
});