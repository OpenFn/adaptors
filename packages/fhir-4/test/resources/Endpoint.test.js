import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("Endpoint", () => {
    it("should create a simple Endpoint", () => {
        const resource = builders.endpoint({});
        assert.isOk(resource);
    });
});