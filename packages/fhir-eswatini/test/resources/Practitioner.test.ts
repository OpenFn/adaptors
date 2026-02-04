import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("SzPractitioner", () => {
    it("should create a simple SzPractitioner", () => {
        const resource = builders.practitioner("SzPractitioner", {});
        assert.isOk(resource);
    });
});