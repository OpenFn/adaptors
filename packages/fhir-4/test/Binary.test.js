import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("Binary", () => {
    it("should create a simple Binary", () => {
        const resource = builders.binary({});
        assert.isOk(resource);
    });
});