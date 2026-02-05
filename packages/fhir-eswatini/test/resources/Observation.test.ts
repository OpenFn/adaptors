import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("SzCauseOfDeath", () => {
    it("should create a simple SzCauseOfDeath", () => {
        const resource = builders.observation("SzCauseOfDeath", {});
        assert.isOk(resource);
    });
});

describe("SzClinicalObservation", () => {
    it("should create a simple SzClinicalObservation", () => {
        const resource = builders.observation("SzClinicalObservation", {});
        assert.isOk(resource);
    });
});

describe("SzLabResult", () => {
    it("should create a simple SzLabResult", () => {
        const resource = builders.observation("SzLabResult", {});
        assert.isOk(resource);
    });
});

describe("SzMannerOfDeath", () => {
    it("should create a simple SzMannerOfDeath", () => {
        const resource = builders.observation("SzMannerOfDeath", {});
        assert.isOk(resource);
    });
});

describe("SzVitalSigns", () => {
    it("should create a simple SzVitalSigns", () => {
        const resource = builders.observation("SzVitalSigns", {});
        assert.isOk(resource);
    });
});