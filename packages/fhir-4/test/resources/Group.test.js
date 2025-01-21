import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("Group", () => {
    it("should create a simple Group", () => {
        const resource = builders.group({});
        assert.isOk(resource);
    });
});