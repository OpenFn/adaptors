import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("NutritionOrder", () => {
    it("should create a simple NutritionOrder", () => {
        const resource = builders.nutritionOrder({});
        assert.isOk(resource);
    });
});