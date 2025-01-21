import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("Evidence", () => {
    it("should create a simple Evidence", () => {
        const resource = builders.evidence({});
        assert.isOk(resource);
    });
});