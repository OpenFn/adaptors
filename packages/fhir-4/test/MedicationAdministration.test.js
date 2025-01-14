import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("MedicationAdministration", () => {
    it("should create a simple MedicationAdministration", () => {
        const resource = builders.medicationAdministration("MedicationAdministration", {});
        assert.isOk(resource);
    });
});