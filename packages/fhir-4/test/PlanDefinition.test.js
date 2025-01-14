import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("PlanDefinition", () => {
    it("should create a simple PlanDefinition", () => {
        const resource = builders.planDefinition("PlanDefinition", {});
        assert.isOk(resource);
    });
});