import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("Practitioner", () => {
    it("should create a simple Practitioner", () => {
        const resource = builders.practitioner({});
        assert.isOk(resource);
    });
});