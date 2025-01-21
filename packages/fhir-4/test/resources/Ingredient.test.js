import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("Ingredient", () => {
    it("should create a simple Ingredient", () => {
        const resource = builders.ingredient({});
        assert.isOk(resource);
    });
});