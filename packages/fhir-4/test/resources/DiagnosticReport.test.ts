import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("DiagnosticReport", () => {
    it("should create a simple DiagnosticReport", () => {
        const resource = builders.diagnosticReport({});
        assert.isOk(resource);
    });
});