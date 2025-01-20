import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("DetectedIssue", () => {
    it("should create a simple DetectedIssue", () => {
        const resource = builders.detectedIssue({});
        assert.isOk(resource);
    });
});