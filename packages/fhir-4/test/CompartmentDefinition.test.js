import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("CompartmentDefinition", () => {
    it("should create a simple CompartmentDefinition", () => {
        const resource = builders.compartmentDefinition({});
        assert.isOk(resource);
    });
});