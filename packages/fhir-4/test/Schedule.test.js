import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("Schedule", () => {
    it("should create a simple Schedule", () => {
        const resource = builders.schedule({});
        assert.isOk(resource);
    });
});