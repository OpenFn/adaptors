import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("Library", () => {
    it("should create a simple Library", () => {
        const resource = builders.library({});
        assert.isOk(resource);
    });
});