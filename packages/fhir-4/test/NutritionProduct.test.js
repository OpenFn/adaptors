import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("NutritionProduct", () => {
    it("should create a simple NutritionProduct", () => {
        const resource = builders.nutritionProduct("NutritionProduct", {});
        assert.isOk(resource);
    });
});