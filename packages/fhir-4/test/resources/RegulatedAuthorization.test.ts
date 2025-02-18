import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("RegulatedAuthorization", () => {
    it("should create a simple RegulatedAuthorization", () => {
        const resource = builders.regulatedAuthorization({});
        assert.isOk(resource);
    });
});