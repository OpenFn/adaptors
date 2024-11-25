import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("fr-core-patient", () => {
    it("should create a simple fr-core-patient", () => {
        const resource = builders.patient("fr-core-patient", {});
        assert.isOk(resource);
    });
});

describe("fr-core-patient-ins", () => {
    it("should create a simple fr-core-patient-ins", () => {
        const resource = builders.patient("fr-core-patient-ins", {});
        assert.isOk(resource);
    });
});