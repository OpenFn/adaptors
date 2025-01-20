import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("CarePlan", () => {
    it("should create a simple CarePlan", () => {
        const resource = builders.carePlan({});
        assert.isOk(resource);
    });
});