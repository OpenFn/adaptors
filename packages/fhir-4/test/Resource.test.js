import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("Resource", () => {
    it("should create a simple Resource", () => {
        const resource = builders.resource({});
        assert.isOk(resource);
    });
});