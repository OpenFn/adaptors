import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("SubstanceDefinition", () => {
    it("should create a simple SubstanceDefinition", () => {
        const resource = builders.substanceDefinition({});
        assert.isOk(resource);
    });
});