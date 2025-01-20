import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("ConceptMap", () => {
    it("should create a simple ConceptMap", () => {
        const resource = builders.conceptMap({});
        assert.isOk(resource);
    });
});