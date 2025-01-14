import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("Ingredient", () => {
    it("should create a simple Ingredient", () => {
        const resource = builders.ingredient("Ingredient", {});
        assert.isOk(resource);
    });
});