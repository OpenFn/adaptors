import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("Ingredient", () => {
    it("should create a simple Ingredient", () => {
        const resource = builders.ingredient({});
        assert.isOk(resource);
    });
});