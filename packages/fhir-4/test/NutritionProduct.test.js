import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("NutritionProduct", () => {
    it("should create a simple NutritionProduct", () => {
        const resource = builders.nutritionProduct({});
        assert.isOk(resource);
    });
});