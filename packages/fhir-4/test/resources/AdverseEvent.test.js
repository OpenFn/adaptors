import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("AdverseEvent", () => {
    it("should create a simple AdverseEvent", () => {
        const resource = builders.adverseEvent({});
        assert.isOk(resource);
    });
});