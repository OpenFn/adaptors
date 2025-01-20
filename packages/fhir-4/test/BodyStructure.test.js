import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("BodyStructure", () => {
    it("should create a simple BodyStructure", () => {
        const resource = builders.bodyStructure({});
        assert.isOk(resource);
    });
});