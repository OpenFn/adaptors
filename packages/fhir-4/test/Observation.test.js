import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("Observation", () => {
    it("should create a simple Observation", () => {
        const resource = builders.observation({});
        assert.isOk(resource);
    });
});