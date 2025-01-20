import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("Substance", () => {
    it("should create a simple Substance", () => {
        const resource = builders.substance({});
        assert.isOk(resource);
    });
});