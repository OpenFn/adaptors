import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("Specimen", () => {
    it("should create a simple Specimen", () => {
        const resource = builders.specimen({});
        assert.isOk(resource);
    });
});