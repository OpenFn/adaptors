import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("BiologicallyDerivedProduct", () => {
    it("should create a simple BiologicallyDerivedProduct", () => {
        const resource = builders.biologicallyDerivedProduct({});
        assert.isOk(resource);
    });
});