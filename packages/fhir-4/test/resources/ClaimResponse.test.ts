import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("ClaimResponse", () => {
    it("should create a simple ClaimResponse", () => {
        const resource = builders.claimResponse({});
        assert.isOk(resource);
    });
});