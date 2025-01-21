import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("Location", () => {
    it("should create a simple Location", () => {
        const resource = builders.location({});
        assert.isOk(resource);
    });
});