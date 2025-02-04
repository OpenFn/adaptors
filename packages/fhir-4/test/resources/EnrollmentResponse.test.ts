import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("EnrollmentResponse", () => {
    it("should create a simple EnrollmentResponse", () => {
        const resource = builders.enrollmentResponse({});
        assert.isOk(resource);
    });
});