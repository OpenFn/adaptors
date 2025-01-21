import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("Organization", () => {
    it("should create a simple Organization", () => {
        const resource = builders.organization({});
        assert.isOk(resource);
    });
});