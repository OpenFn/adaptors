import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("AuditEvent", () => {
    it("should create a simple AuditEvent", () => {
        const resource = builders.auditEvent({});
        assert.isOk(resource);
    });
});