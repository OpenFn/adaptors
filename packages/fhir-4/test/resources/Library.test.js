import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("Library", () => {
    it("should create a simple Library", () => {
        const resource = builders.library({});
        assert.isOk(resource);
    });
});