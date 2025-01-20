import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("CapabilityStatement", () => {
    it("should create a simple CapabilityStatement", () => {
        const resource = builders.capabilityStatement({});
        assert.isOk(resource);
    });
});