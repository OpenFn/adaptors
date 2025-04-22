import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("MedicationRequest", () => {
    it("should create a simple MedicationRequest", () => {
        const resource = builders.medicationRequest({});
        assert.isOk(resource);
    });
});