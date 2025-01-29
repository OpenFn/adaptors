import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("EvidenceReport", () => {
    it("should create a simple EvidenceReport", () => {
        const resource = builders.evidenceReport({});
        assert.isOk(resource);
    });
});