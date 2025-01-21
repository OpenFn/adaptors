import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("Bundle", () => {
    it("should create a simple Bundle", () => {
        const resource = builders.bundle({});
        assert.isOk(resource);
    });
});