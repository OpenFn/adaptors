import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("Citation", () => {
    it("should create a simple Citation", () => {
        const resource = builders.citation({});
        assert.isOk(resource);
    });
});