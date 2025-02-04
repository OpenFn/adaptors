import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("Medication", () => {
    it("should create a simple Medication", () => {
        const resource = builders.medication({});
        assert.isOk(resource);
    });
});