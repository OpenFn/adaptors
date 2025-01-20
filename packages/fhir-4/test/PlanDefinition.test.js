import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("PlanDefinition", () => {
    it("should create a simple PlanDefinition", () => {
        const resource = builders.planDefinition({});
        assert.isOk(resource);
    });
});