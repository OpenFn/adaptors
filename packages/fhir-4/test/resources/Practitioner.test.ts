import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("Practitioner", () => {
    it("should create a simple Practitioner", () => {
        const resource = builders.practitioner({});
        assert.isOk(resource);
    });
});