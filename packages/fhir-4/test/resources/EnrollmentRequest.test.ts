import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("EnrollmentRequest", () => {
    it("should create a simple EnrollmentRequest", () => {
        const resource = builders.enrollmentRequest({});
        assert.isOk(resource);
    });
});