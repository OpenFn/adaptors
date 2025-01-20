import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("Invoice", () => {
    it("should create a simple Invoice", () => {
        const resource = builders.invoice({});
        assert.isOk(resource);
    });
});