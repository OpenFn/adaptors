import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("VerificationResult", () => {
    it("should create a simple VerificationResult", () => {
        const resource = builders.verificationResult("VerificationResult", {});
        assert.isOk(resource);
    });
});