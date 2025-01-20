import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("RegulatedAuthorization", () => {
    it("should create a simple RegulatedAuthorization", () => {
        const resource = builders.regulatedAuthorization({});
        assert.isOk(resource);
    });
});