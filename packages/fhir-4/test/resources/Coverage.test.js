import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("Coverage", () => {
    it("should create a simple Coverage", () => {
        const resource = builders.coverage({});
        assert.isOk(resource);
    });
});