import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("BodyStructure", () => {
    it("should create a simple BodyStructure", () => {
        const resource = builders.bodyStructure({});
        assert.isOk(resource);
    });
});