import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("Media", () => {
    it("should create a simple Media", () => {
        const resource = builders.media({});
        assert.isOk(resource);
    });
});