import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("TestReport", () => {
    it("should create a simple TestReport", () => {
        const resource = builders.testReport({});
        assert.isOk(resource);
    });
});