import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("Encounter", () => {
    it("should create a simple Encounter", () => {
        const resource = builders.encounter({});
        assert.isOk(resource);
    });
});