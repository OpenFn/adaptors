import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("PackagedProductDefinition", () => {
    it("should create a simple PackagedProductDefinition", () => {
        const resource = builders.packagedProductDefinition({});
        assert.isOk(resource);
    });
});