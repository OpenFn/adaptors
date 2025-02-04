import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("List", () => {
    it("should create a simple List", () => {
        const resource = builders.list({});
        assert.isOk(resource);
    });
});