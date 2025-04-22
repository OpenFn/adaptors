import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("DetectedIssue", () => {
    it("should create a simple DetectedIssue", () => {
        const resource = builders.detectedIssue({});
        assert.isOk(resource);
    });
});