import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("DiagnosticReport", () => {
    it("should create a simple DiagnosticReport", () => {
        const resource = builders.diagnosticReport("DiagnosticReport", {});
        assert.isOk(resource);
    });
});