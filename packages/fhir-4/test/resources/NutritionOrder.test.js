import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("NutritionOrder", () => {
    it("should create a simple NutritionOrder", () => {
        const resource = builders.nutritionOrder({});
        assert.isOk(resource);
    });
});