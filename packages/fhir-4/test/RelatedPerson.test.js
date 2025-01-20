import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("RelatedPerson", () => {
    it("should create a simple RelatedPerson", () => {
        const resource = builders.relatedPerson({});
        assert.isOk(resource);
    });
});