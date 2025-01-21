import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("EventDefinition", () => {
    it("should create a simple EventDefinition", () => {
        const resource = builders.eventDefinition({});
        assert.isOk(resource);
    });
});