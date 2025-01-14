import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("AuditEvent", () => {
    it("should create a simple AuditEvent", () => {
        const resource = builders.auditEvent("AuditEvent", {});
        assert.isOk(resource);
    });
});