import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("Slot", () => {
    it("should create a simple Slot", () => {
        const resource = builders.slot({});
        assert.isOk(resource);
    });
});