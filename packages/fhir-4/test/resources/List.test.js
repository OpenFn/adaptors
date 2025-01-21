import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("List", () => {
    it("should create a simple List", () => {
        const resource = builders.list({});
        assert.isOk(resource);
    });
});