import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("Parameters", () => {
    it("should create a simple Parameters", () => {
        const resource = builders.parameters({});
        assert.isOk(resource);
    });
});