import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("ExampleScenario", () => {
    it("should create a simple ExampleScenario", () => {
        const resource = builders.exampleScenario({});
        assert.isOk(resource);
    });
});