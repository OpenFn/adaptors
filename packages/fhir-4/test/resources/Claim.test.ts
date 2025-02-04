import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("Claim", () => {
    it("should create a simple Claim", () => {
        const resource = builders.claim({});
        assert.isOk(resource);
    });
});