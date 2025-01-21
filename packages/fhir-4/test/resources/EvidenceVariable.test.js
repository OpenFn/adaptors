import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("EvidenceVariable", () => {
    it("should create a simple EvidenceVariable", () => {
        const resource = builders.evidenceVariable({});
        assert.isOk(resource);
    });
});