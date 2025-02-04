import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("VerificationResult", () => {
    it("should create a simple VerificationResult", () => {
        const resource = builders.verificationResult({});
        assert.isOk(resource);
    });
});