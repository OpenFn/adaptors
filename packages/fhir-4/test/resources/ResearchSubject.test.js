import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("ResearchSubject", () => {
    it("should create a simple ResearchSubject", () => {
        const resource = builders.researchSubject({});
        assert.isOk(resource);
    });
});