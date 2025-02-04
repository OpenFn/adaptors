import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("Citation", () => {
    it("should create a simple Citation", () => {
        const resource = builders.citation({});
        assert.isOk(resource);
    });
});