import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("ImplementationGuide", () => {
    it("should create a simple ImplementationGuide", () => {
        const resource = builders.implementationGuide({});
        assert.isOk(resource);
    });
});