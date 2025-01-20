import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("Device", () => {
    it("should create a simple Device", () => {
        const resource = builders.device({});
        assert.isOk(resource);
    });
});