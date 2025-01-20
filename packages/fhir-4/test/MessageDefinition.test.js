import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("MessageDefinition", () => {
    it("should create a simple MessageDefinition", () => {
        const resource = builders.messageDefinition({});
        assert.isOk(resource);
    });
});