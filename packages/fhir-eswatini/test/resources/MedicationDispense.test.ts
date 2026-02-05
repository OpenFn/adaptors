import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("SzMedicationDispense", () => {
    it("should create a simple SzMedicationDispense", () => {
        const resource = builders.medicationDispense("SzMedicationDispense", {});
        assert.isOk(resource);
    });
});