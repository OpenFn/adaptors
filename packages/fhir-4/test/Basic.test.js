import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("Basic", () => {
    it("should create a simple Basic", () => {
        const resource = builders.basic({});
        assert.isOk(resource);
    });
});