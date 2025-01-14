import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("EnrollmentResponse", () => {
    it("should create a simple EnrollmentResponse", () => {
        const resource = builders.enrollmentResponse("EnrollmentResponse", {});
        assert.isOk(resource);
    });
});