import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("Contract", () => {
    it("should create a simple Contract", () => {
        const resource = builders.contract({});
        assert.isOk(resource);
    });
});