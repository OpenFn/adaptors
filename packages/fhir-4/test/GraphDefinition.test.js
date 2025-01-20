import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("GraphDefinition", () => {
    it("should create a simple GraphDefinition", () => {
        const resource = builders.graphDefinition({});
        assert.isOk(resource);
    });
});