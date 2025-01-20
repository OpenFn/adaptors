import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("Condition", () => {
    it("should create a simple Condition", () => {
        const resource = builders.condition({});
        assert.isOk(resource);
    });
});