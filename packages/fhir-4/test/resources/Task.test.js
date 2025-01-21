import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("Task", () => {
    it("should create a simple Task", () => {
        const resource = builders.task({});
        assert.isOk(resource);
    });
});