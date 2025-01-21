import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("TestScript", () => {
    it("should create a simple TestScript", () => {
        const resource = builders.testScript({});
        assert.isOk(resource);
    });
});