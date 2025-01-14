import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("Specimen", () => {
    it("should create a simple Specimen", () => {
        const resource = builders.specimen("Specimen", {});
        assert.isOk(resource);
    });
});