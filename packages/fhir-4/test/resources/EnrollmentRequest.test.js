import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("EnrollmentRequest", () => {
    it("should create a simple EnrollmentRequest", () => {
        const resource = builders.enrollmentRequest({});
        assert.isOk(resource);
    });
});