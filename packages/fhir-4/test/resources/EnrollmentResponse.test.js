import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("EnrollmentResponse", () => {
    it("should create a simple EnrollmentResponse", () => {
        const resource = builders.enrollmentResponse({});
        assert.isOk(resource);
    });
});