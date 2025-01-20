import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("GuidanceResponse", () => {
    it("should create a simple GuidanceResponse", () => {
        const resource = builders.guidanceResponse({});
        assert.isOk(resource);
    });
});