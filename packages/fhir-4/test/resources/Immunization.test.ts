import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("Immunization", () => {
    it("should create a simple Immunization", () => {
        const resource = builders.immunization({});
        assert.isOk(resource);
    });
});