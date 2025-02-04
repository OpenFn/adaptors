import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("Observation", () => {
    it("should create a simple Observation", () => {
        const resource = builders.observation({});
        assert.isOk(resource);
    });
});