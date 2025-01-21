import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("ClaimResponse", () => {
    it("should create a simple ClaimResponse", () => {
        const resource = builders.claimResponse({});
        assert.isOk(resource);
    });
});