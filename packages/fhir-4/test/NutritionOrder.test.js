import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("NutritionOrder", () => {
    it("should create a simple NutritionOrder", () => {
        const resource = builders.nutritionOrder("NutritionOrder", {});
        assert.isOk(resource);
    });
});