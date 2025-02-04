import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("NutritionProduct", () => {
    it("should create a simple NutritionProduct", () => {
        const resource = builders.nutritionProduct({});
        assert.isOk(resource);
    });
});