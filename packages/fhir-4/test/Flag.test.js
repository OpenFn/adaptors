import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("Flag", () => {
    it("should create a simple Flag", () => {
        const resource = builders.flag({});
        assert.isOk(resource);
    });
});