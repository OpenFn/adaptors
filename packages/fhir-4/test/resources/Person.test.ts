import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("Person", () => {
    it("should create a simple Person", () => {
        const resource = builders.person({});
        assert.isOk(resource);
    });
});