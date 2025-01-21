import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("Linkage", () => {
    it("should create a simple Linkage", () => {
        const resource = builders.linkage({});
        assert.isOk(resource);
    });
});