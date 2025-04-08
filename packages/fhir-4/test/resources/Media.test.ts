import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("Media", () => {
    it("should create a simple Media", () => {
        const resource = builders.media({});
        assert.isOk(resource);
    });
});