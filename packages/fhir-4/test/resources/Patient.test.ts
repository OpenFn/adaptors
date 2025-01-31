import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("Patient", () => {
    it("should create a simple Patient", () => {
        const resource = builders.patient({});
        assert.isOk(resource);
    });
});