import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("fr-core-observation-bmi", () => {
    it("should create a simple fr-core-observation-bmi", () => {
        const resource = builders.observation("fr-core-observation-bmi", {});
        assert.isOk(resource);
    });
});

describe("fr-core-observation-body-height", () => {
    it("should create a simple fr-core-observation-body-height", () => {
        const resource = builders.observation("fr-core-observation-body-height", {});
        assert.isOk(resource);
    });
});

describe("fr-core-observation-body-temperature", () => {
    it("should create a simple fr-core-observation-body-temperature", () => {
        const resource = builders.observation("fr-core-observation-body-temperature", {});
        assert.isOk(resource);
    });
});

describe("fr-core-observation-body-weight", () => {
    it("should create a simple fr-core-observation-body-weight", () => {
        const resource = builders.observation("fr-core-observation-body-weight", {});
        assert.isOk(resource);
    });
});

describe("fr-core-observation-bp", () => {
    it("should create a simple fr-core-observation-bp", () => {
        const resource = builders.observation("fr-core-observation-bp", {});
        assert.isOk(resource);
    });
});

describe("fr-core-observation-head-circum", () => {
    it("should create a simple fr-core-observation-head-circum", () => {
        const resource = builders.observation("fr-core-observation-head-circum", {});
        assert.isOk(resource);
    });
});

describe("fr-core-observation-heartrate", () => {
    it("should create a simple fr-core-observation-heartrate", () => {
        const resource = builders.observation("fr-core-observation-heartrate", {});
        assert.isOk(resource);
    });
});

describe("fr-core-observation-resp-rate", () => {
    it("should create a simple fr-core-observation-resp-rate", () => {
        const resource = builders.observation("fr-core-observation-resp-rate", {});
        assert.isOk(resource);
    });
});

describe("fr-core-observation-saturation-oxygen", () => {
    it("should create a simple fr-core-observation-saturation-oxygen", () => {
        const resource = builders.observation("fr-core-observation-saturation-oxygen", {});
        assert.isOk(resource);
    });
});