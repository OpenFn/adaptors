import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("Immunization", () => {
    it("should create a simple Immunization", () => {
        const resource = builders.immunization({});
        assert.isOk(resource);
    });
});