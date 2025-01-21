import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("DiagnosticReport", () => {
    it("should create a simple DiagnosticReport", () => {
        const resource = builders.diagnosticReport({});
        assert.isOk(resource);
    });
});