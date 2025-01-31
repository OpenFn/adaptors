import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("SubstanceDefinition", () => {
    it("should create a simple SubstanceDefinition", () => {
        const resource = builders.substanceDefinition({});
        assert.isOk(resource);
    });
});