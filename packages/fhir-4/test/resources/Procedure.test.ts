import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("Procedure", () => {
    it("should create a simple Procedure", () => {
        const resource = builders.procedure({});
        assert.isOk(resource);
    });
});