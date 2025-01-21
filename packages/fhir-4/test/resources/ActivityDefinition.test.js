import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("ActivityDefinition", () => {
    it("should create a simple ActivityDefinition", () => {
        const resource = builders.activityDefinition({});
        assert.isOk(resource);
    });
});