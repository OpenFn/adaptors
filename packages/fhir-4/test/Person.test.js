import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("Person", () => {
    it("should create a simple Person", () => {
        const resource = builders.person({});
        assert.isOk(resource);
    });
});