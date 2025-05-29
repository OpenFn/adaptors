import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("MedicationAdministration", () => {
    it("should create a simple MedicationAdministration", () => {
        const resource = builders.medicationAdministration({});
        assert.isOk(resource);
    });
});