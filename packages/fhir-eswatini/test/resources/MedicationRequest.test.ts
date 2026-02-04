import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("SzMedicationRequest", () => {
    it("should create a simple SzMedicationRequest", () => {
        const resource = builders.medicationRequest("SzMedicationRequest", {});
        assert.isOk(resource);
    });
});