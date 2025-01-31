import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("Endpoint", () => {
    it("should create a simple Endpoint", () => {
        const resource = builders.endpoint({});
        assert.isOk(resource);
    });
});