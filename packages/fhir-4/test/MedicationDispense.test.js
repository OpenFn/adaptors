import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("MedicationDispense", () => {
    it("should create a simple MedicationDispense", () => {
        const resource = builders.medicationDispense("MedicationDispense", {});
        assert.isOk(resource);
    });
});