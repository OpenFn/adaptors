import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("Goal", () => {
    it("should create a simple Goal", () => {
        const resource = builders.goal({});
        assert.isOk(resource);
    });
});