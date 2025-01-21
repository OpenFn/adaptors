import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("Claim", () => {
    it("should create a simple Claim", () => {
        const resource = builders.claim({});
        assert.isOk(resource);
    });
});