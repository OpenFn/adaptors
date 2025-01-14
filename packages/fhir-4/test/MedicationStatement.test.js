import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("MedicationStatement", () => {
    it("should create a simple MedicationStatement", () => {
        const resource = builders.medicationStatement("MedicationStatement", {});
        assert.isOk(resource);
    });
});