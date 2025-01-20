import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("ValueSet", () => {
    it("should create a simple ValueSet", () => {
        const resource = builders.valueSet({});
        assert.isOk(resource);
    });
});