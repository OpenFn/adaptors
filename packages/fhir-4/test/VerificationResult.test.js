import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("VerificationResult", () => {
    it("should create a simple VerificationResult", () => {
        const resource = builders.verificationResult({});
        assert.isOk(resource);
    });
});