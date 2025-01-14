import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("EnrollmentRequest", () => {
    it("should create a simple EnrollmentRequest", () => {
        const resource = builders.enrollmentRequest("EnrollmentRequest", {});
        assert.isOk(resource);
    });
});