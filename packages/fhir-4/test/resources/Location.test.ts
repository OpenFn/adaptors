import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("Location", () => {
    it("should create a simple Location", () => {
        const resource = builders.location({});
        assert.isOk(resource);
    });
});