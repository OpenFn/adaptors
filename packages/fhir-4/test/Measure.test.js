import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("Measure", () => {
    it("should create a simple Measure", () => {
        const resource = builders.measure({});
        assert.isOk(resource);
    });
});