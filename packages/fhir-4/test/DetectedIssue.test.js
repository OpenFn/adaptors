import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("DetectedIssue", () => {
    it("should create a simple DetectedIssue", () => {
        const resource = builders.detectedIssue("DetectedIssue", {});
        assert.isOk(resource);
    });
});