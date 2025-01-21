import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("Procedure", () => {
    it("should create a simple Procedure", () => {
        const resource = builders.procedure({});
        assert.isOk(resource);
    });
});