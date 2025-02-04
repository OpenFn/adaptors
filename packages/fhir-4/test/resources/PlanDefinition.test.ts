import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("PlanDefinition", () => {
    it("should create a simple PlanDefinition", () => {
        const resource = builders.planDefinition({});
        assert.isOk(resource);
    });
});