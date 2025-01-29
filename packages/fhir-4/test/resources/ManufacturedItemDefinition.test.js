import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("ManufacturedItemDefinition", () => {
    it("should create a simple ManufacturedItemDefinition", () => {
        const resource = builders.manufacturedItemDefinition({});
        assert.isOk(resource);
    });
});